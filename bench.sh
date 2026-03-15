#!/usr/bin/env bash
set -euo pipefail

#
# Docker Build Benchmark Harness
# Usage: ./bench.sh <variant> [--runs N] [--scenario cold|warm|incremental|deps] [--no-cache]
#
# Variants: baseline, layered, multistage, cachemount, registry, combined, distroless
# Scenarios:
#   cold        — prune build cache, full rebuild
#   warm        — rebuild with full cache, no changes
#   incremental — change one component, rebuild
#   deps        — change lockfile, rebuild
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKERFILES_DIR="${SCRIPT_DIR}/benchmarks/dockerfiles"
RESULTS_DIR="${SCRIPT_DIR}/benchmarks/results"

# Defaults
VARIANT=""
RUNS=3
SCENARIO="cold"
EXTRA_BUILD_ARGS=""
REGISTRY_CACHE=""
TAG_PREFIX="harness-bench"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

usage() {
  echo "Usage: ./bench.sh <variant> [options]"
  echo ""
  echo "Variants: baseline, layered, multistage, cachemount, registry, combined, distroless"
  echo ""
  echo "Options:"
  echo "  --runs N          Number of runs (default: 3)"
  echo "  --scenario TYPE   cold|warm|incremental|deps (default: cold)"
  echo "  --registry HOST   Registry for cache-to/from (registry variant only)"
  echo "  --all             Run all variants"
  echo "  --all-scenarios   Run all scenarios for the given variant"
  echo ""
  exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --runs) RUNS="$2"; shift 2 ;;
    --scenario) SCENARIO="$2"; shift 2 ;;
    --registry) REGISTRY_CACHE="$2"; shift 2 ;;
    --all) VARIANT="__all__"; shift ;;
    --all-scenarios) VARIANT="${VARIANT:-__ask__}"; SCENARIO="__all__"; shift ;;
    --help|-h) usage ;;
    -*) echo "Unknown option: $1"; usage ;;
    *) VARIANT="$1"; shift ;;
  esac
done

[[ -z "$VARIANT" ]] && usage

# Collect system info
collect_env() {
  local os arch docker_version cpu ram_gb
  os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  arch="$(uname -m)"
  docker_version="$(docker version --format '{{.Server.Version}}' 2>/dev/null || echo 'unknown')"

  if [[ "$os" == "darwin" ]]; then
    cpu="$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo 'unknown')"
    ram_gb="$(( $(sysctl -n hw.memsize 2>/dev/null || echo 0) / 1073741824 ))"
  else
    cpu="$(lscpu 2>/dev/null | grep 'Model name' | sed 's/.*: *//' || echo 'unknown')"
    ram_gb="$(free -g 2>/dev/null | awk '/Mem:/ {print $2}' || echo 'unknown')"
  fi

  cat <<EOF
{
    "os": "${os}",
    "arch": "${arch}",
    "docker_version": "${docker_version}",
    "cpu": "${cpu}",
    "ram_gb": ${ram_gb}
  }
EOF
}

# Prepare scenario
prepare_scenario() {
  local scenario="$1"

  case "$scenario" in
    cold)
      echo -e "${YELLOW}Pruning Docker build cache for cold build...${NC}"
      docker builder prune -f --all 2>/dev/null || true
      ;;
    warm)
      echo -e "${BLUE}Warm build — no changes, using existing cache${NC}"
      ;;
    incremental)
      echo -e "${BLUE}Incremental — modifying one component...${NC}"
      # Touch a single component to invalidate that layer
      local target_file="${SCRIPT_DIR}/app/src/components/ui/Button.tsx"
      if [[ -f "$target_file" ]]; then
        echo "// Incremental change: $(date +%s)" >> "$target_file"
      fi
      ;;
    deps)
      echo -e "${BLUE}Deps — simulating lockfile change...${NC}"
      # Touch the lockfile to invalidate dependency layer
      touch "${SCRIPT_DIR}/app/bun.lockb" 2>/dev/null || true
      ;;
    *)
      echo -e "${RED}Unknown scenario: ${scenario}${NC}"
      exit 1
      ;;
  esac
}

# Restore scenario changes
restore_scenario() {
  local scenario="$1"
  case "$scenario" in
    incremental)
      # Restore the modified file
      cd "$SCRIPT_DIR"
      git checkout -- app/src/components/ui/Button.tsx 2>/dev/null || true
      ;;
    deps)
      cd "$SCRIPT_DIR"
      git checkout -- app/bun.lockb 2>/dev/null || true
      ;;
  esac
}

# Run a single build and measure
run_build() {
  local variant="$1"
  local dockerfile="${DOCKERFILES_DIR}/${variant}.Dockerfile"
  local tag="${TAG_PREFIX}-${variant}"

  if [[ ! -f "$dockerfile" ]]; then
    echo -e "${RED}Dockerfile not found: ${dockerfile}${NC}"
    return 1
  fi

  local build_cmd="docker build"
  build_cmd+=" -f ${dockerfile}"
  build_cmd+=" -t ${tag}"
  build_cmd+=" --progress=plain"

  # Registry cache for the registry variant
  if [[ "$variant" == "registry" && -n "$REGISTRY_CACHE" ]]; then
    build_cmd+=" --cache-from=type=registry,ref=${REGISTRY_CACHE}:${tag}-cache"
    build_cmd+=" --cache-to=type=registry,ref=${REGISTRY_CACHE}:${tag}-cache,mode=max"
  fi

  build_cmd+=" ${EXTRA_BUILD_ARGS}"
  build_cmd+=" ${SCRIPT_DIR}"

  # Time the build (use perl for sub-second precision on macOS)
  local start_time end_time build_time_s
  start_time=$(perl -MTime::HiRes=time -e 'printf "%.3f\n", time')

  if eval "$build_cmd" > /tmp/bench-build-output.log 2>&1; then
    end_time=$(perl -MTime::HiRes=time -e 'printf "%.3f\n", time')
    build_time_s=$(echo "$end_time - $start_time" | bc | sed 's/^\./0./')
  else
    echo -e "${RED}Build failed for ${variant}!${NC}"
    cat /tmp/bench-build-output.log
    return 1
  fi

  # Get image size
  local image_size_mb
  image_size_mb=$(docker image inspect "$tag" --format='{{.Size}}' 2>/dev/null | awk '{printf "%.1f", $1/1048576}')

  # Get layer count
  local layer_count
  layer_count=$(docker image inspect "$tag" --format='{{len .RootFS.Layers}}' 2>/dev/null || echo "0")

  # Get build cache size
  local cache_size_mb
  cache_size_mb=$(docker system df --format='{{.BuildCache}}' 2>/dev/null | head -1 || echo "0")
  # Try to get numeric cache size
  cache_size_mb=$(docker system df -v 2>/dev/null | grep "Build cache" | awk '{print $NF}' | head -1 || echo "0")

  echo "${build_time_s}|${image_size_mb}|${layer_count}|${cache_size_mb}"
}

# Run benchmark for a single variant + scenario
benchmark() {
  local variant="$1"
  local scenario="$2"

  echo ""
  echo -e "${GREEN}========================================${NC}"
  echo -e "${GREEN} Benchmarking: ${variant} (${scenario})${NC}"
  echo -e "${GREEN} Runs: ${RUNS}${NC}"
  echo -e "${GREEN}========================================${NC}"

  local results=()
  local build_times=()

  for i in $(seq 1 "$RUNS"); do
    echo ""
    echo -e "${BLUE}--- Run ${i}/${RUNS} ---${NC}"

    # Only prepare scenario on first run for cold, on every run otherwise
    if [[ "$scenario" == "cold" || "$i" -eq 1 ]]; then
      prepare_scenario "$scenario"
    fi

    local result
    result=$(run_build "$variant")
    if [[ $? -ne 0 ]]; then
      echo -e "${RED}Run ${i} failed, skipping...${NC}"
      continue
    fi

    local build_time image_size layer_count cache_size
    IFS='|' read -r build_time image_size layer_count cache_size <<< "$result"

    echo -e "  Build time: ${GREEN}${build_time}s${NC}"
    echo -e "  Image size: ${image_size} MB"
    echo -e "  Layers:     ${layer_count}"

    results+=("{\"build_time_s\": ${build_time}, \"image_size_mb\": ${image_size}, \"layer_count\": ${layer_count}}")
    build_times+=("$build_time")
  done

  # Restore any scenario modifications
  restore_scenario "$scenario"

  # Calculate median
  local median_time
  if [[ ${#build_times[@]} -gt 0 ]]; then
    median_time=$(printf '%s\n' "${build_times[@]}" | sort -n | awk 'NR==int((NR+1)/2)')
  else
    median_time="0"
  fi

  # Build JSON result
  local timestamp runs_json env_json
  timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  runs_json=$(IFS=','; echo "[${results[*]}]")
  env_json=$(collect_env)

  local result_file="${RESULTS_DIR}/${variant}-${scenario}-$(date +%Y%m%d-%H%M%S).json"
  mkdir -p "$RESULTS_DIR"

  cat > "$result_file" <<EOF
{
  "variant": "${variant}",
  "scenario": "${scenario}",
  "timestamp": "${timestamp}",
  "runs": ${runs_json},
  "median_build_time_s": ${median_time},
  "environment": ${env_json}
}
EOF

  echo ""
  echo -e "${GREEN}Results saved to: ${result_file}${NC}"
  echo -e "${GREEN}Median build time: ${median_time}s${NC}"
}

# --- Main ---

ALL_VARIANTS=(baseline layered multistage cachemount registry combined distroless gha-optimized combined-distroless parallel test-target bun-compile)
ALL_SCENARIOS=(cold warm incremental deps)

if [[ "$VARIANT" == "__all__" ]]; then
  for v in "${ALL_VARIANTS[@]}"; do
    if [[ "$SCENARIO" == "__all__" ]]; then
      for s in "${ALL_SCENARIOS[@]}"; do
        benchmark "$v" "$s"
      done
    else
      benchmark "$v" "$SCENARIO"
    fi
  done
elif [[ "$SCENARIO" == "__all__" ]]; then
  for s in "${ALL_SCENARIOS[@]}"; do
    benchmark "$VARIANT" "$s"
  done
else
  benchmark "$VARIANT" "$SCENARIO"
fi

echo ""
echo -e "${GREEN}All benchmarks complete. Run 'bun run analyze' to see comparison.${NC}"
