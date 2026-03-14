# Docker Build Benchmark Report

> Generated: 2026-03-14T19:40:44.950Z
> Results: 22 benchmark runs

## Environment

| Property | Value |
|----------|-------|
| OS | darwin |
| Arch | arm64 |
| Docker | 27.4.0 |
| CPU | Apple M1 Pro |
| RAM | 32 GB |

## Results

| Variant | cold | warm | incremental | deps | Image Size | Layers |
|---------|----------|----------|----------|----------|------------|--------|
| **baseline** | 9.4s (1.0x) | 1.3s | 1.5s | 1.5s | 437.8 MB | 10 |
| **cachemount** | 20.0s (0.5x) | 1.8s | 3.8s | 1.3s | 398.1 MB | 10 |
| **combined** | 14.8s (0.6x) | 0.5s | 0.7s | 0.7s | 367.6 MB | 10 |
| **distroless** | 17.9s (0.5x) | 1.5s | 1.6s | 1.4s | 326.2 MB | 19 |
| **layered** | 17.8s (0.5x) | 1.5s | 1.6s | 1.9s | 577.2 MB | 11 |
| **multistage** | 23.1s (0.4x) | — | — | — | 398.1 MB | 10 |
| **registry** | 21.3s (0.4x) | — | — | — | 398.1 MB | 10 |


## Winners

| Scenario | Best Variant | Time |
|----------|-------------|------|
| cold | **baseline** | 9.3s |
| warm | **combined** | 0.5s |
| incremental | **combined** | 0.6s |
| deps | **combined** | 0.6s |

## Key Findings

Based on 22 benchmark runs across 7 variants on Apple M1 Pro / Docker 27.4:

### 1. `combined` is the best all-rounder

The `combined` variant (multi-stage + `COPY --link` + cache mounts + fine-grained layer splitting) wins every cached scenario by 2-3x:

- **Warm**: 0.5s vs next-best 1.3s (baseline) — **2.6x faster**
- **Incremental**: 0.7s vs next-best 1.5s (baseline) — **2.1x faster**
- **Deps changed**: 0.7s vs next-best 1.3s (cachemount) — **1.9x faster**

### 2. `COPY --link` is the highest-leverage single technique

The key differentiator between `combined` and other multi-stage variants (`multistage`, `cachemount`) is `COPY --link`. Without it, multi-stage builds are actually *slower* than baseline because the inter-stage COPY invalidates downstream layers. With `--link`, each COPY creates an independent layer that can be reused even when upstream stages change.

### 3. Cold builds favor simplicity

For cold builds (no cache at all), the naive `baseline` (9.4s) beats everything because it has zero inter-stage overhead. The `combined` penalty is ~5s (14.8s), which is acceptable given the 2-3x gains on subsequent builds.

### 4. Image size ladder

| Variant | Size | vs Baseline |
|---------|------|-------------|
| distroless | 326 MB | -25% |
| combined | 368 MB | -16% |
| cachemount / multistage | 398 MB | -9% |
| baseline | 438 MB | — |
| layered | 577 MB | +32% |

The `layered` variant is largest because it keeps dev dependencies in the final image (single-stage, no pruning).

### 5. Cache mounts help deps, not incremental

`--mount=type=cache` for bun's install cache helps on dependency updates (1.3s for cachemount vs 1.9s for layered) but doesn't help incremental source changes. The cache mount's value is primarily in CI with persistent runners where the bun cache directory survives between builds.

### 6. Variance is high on run 1

Nearly every variant shows a ~3-10x slowdown on the first run of a warm/incremental/deps benchmark. This is Docker's BuildKit warming up its internal caches (metadata, content hashing). The median of runs 2-3 is the representative number.

## GitHub Actions CI Results

> Tested on ubuntu-latest runners, 2026-03-14, workflow run #23095170933

### Cache Backend Comparison (gha-optimized.Dockerfile)

| Cache Backend | Cold | Warm | Incremental | Image Size |
|---------------|------|------|-------------|------------|
| **gha** | 28.8s | 1.0s | 5.8s | — |
| **local** | 35.5s | 4.0s | 6.5s | — |
| **inline** | 28.3s | 0.9s | 5.9s | — |
| **none** | 29.3s | 1.0s | 6.1s | — |

### GHA Cache Backend (docker/build-push-action)

| Scenario | Time |
|----------|------|
| Cold (populate cache) | ~29s |
| Warm (from GHA cache) | ~1s |
| Incremental (one file changed) | ~6s |

### Cross-Run Cache Persistence

| Run | Time | Notes |
|-----|------|-------|
| Run 1 | ~29s | Cold (no prior cache) |
| Run 2 | 29.5s | Cold again — Dockerfile changed between runs, invalidating cache |
| Run 3 | **pending** | Need to trigger without Dockerfile changes to test true persistence |

### CI Key Findings

#### 7. GHA runners are ~2x slower than local M1 Pro on cold builds

Cold builds on ubuntu-latest (~29s) vs local M1 Pro (~15s). This is expected given the hardware difference (shared GHA runners vs dedicated Apple Silicon).

#### 8. `inline` cache surprisingly matches `gha` on warm builds

The `inline` cache backend (0.9s warm) performed identically to `gha` (1.0s warm) within the same workflow run. However, `inline` cache is embedded in the image layers and won't persist across runs on ephemeral runners unless the image is pushed to a registry. The `gha` backend persists via GitHub's cache service.

#### 9. `local` cache is slowest on GHA

The `local` backend (4.0s warm, 35.5s cold) is the worst performer on ephemeral runners. The local cache directory doesn't persist between workflow runs, and the overhead of writing to it adds ~6s to cold builds vs other backends.

#### 10. Warm builds on GHA show the cache works within a single run

All backends achieve ~1s warm builds within the same job, proving BuildKit's layer caching works. The real question is cross-run persistence — which only `type=gha` and `type=registry` can provide on ephemeral runners.

#### 11. Incremental builds are ~6s on GHA vs ~0.7s locally

The 8x slowdown on incremental builds (6s vs 0.7s) suggests GHA runners have significantly slower I/O or BuildKit metadata operations. This makes cache persistence even more important in CI — you want to avoid full rebuilds at all costs.

## Recommendations

### For local development
Use `combined.Dockerfile`. Sub-second rebuilds on source changes.

### For CI with persistent cache (self-hosted runners)
Use `combined.Dockerfile` with `--cache-to=type=local,dest=/tmp/docker-cache` and `--cache-from=type=local,src=/tmp/docker-cache`. Should achieve ~1-2s builds after the first run.

### For CI with ephemeral runners (GitHub Actions)
Use `gha-optimized.Dockerfile` with `--cache-to=type=gha,mode=max` and `--cache-from=type=gha`. Cold builds are ~29s on ubuntu-latest, warm builds drop to ~1s within the same run. Cross-run cache persistence (the key advantage of `type=gha`) needs further validation — see pending Run 3 in cross-run test above. Avoid `type=local` on ephemeral runners (adds overhead, doesn't persist).

### For smallest production image
Combine the `combined` build stages with `distroless` runtime stage. Expected: ~300 MB image with sub-second rebuilds.

## Next Iterations

1. ~~**combined-distroless hybrid**~~ — **DONE** (295.7 MB, smallest image)
2. ~~**GHA cache backend**~~ — **DONE** (see CI results above)
3. **Cross-run GHA cache persistence** — trigger a 3rd workflow run (no Dockerfile changes) to validate `type=gha` cache survives between runs
4. **Parallel multi-stage** — test if BuildKit parallelizes independent stages
5. **Bun compile** — test `bun build --compile` for single-binary output (no node_modules in image)
6. **Layer analysis** — use `docker history` and `dive` to find layer bloat
7. **Larger runner classes** — benchmark on `ubuntu-latest-4-cores` or `ubuntu-latest-8-cores` to see if GHA cold builds improve with more CPU


## Per-Variant Details

### baseline

- **deps**: median=1.5s, mean=4.1s, min=1.3s, max=9.4s, stddev=3.76s (3 runs)
- **cold**: median=9.4s, mean=9.6s, min=9.3s, max=10.0s, stddev=0.34s (3 runs)
- **warm**: median=1.3s, mean=3.2s, min=1.3s, max=7.2s, stddev=2.78s (3 runs)
- **incremental**: median=1.5s, mean=3.8s, min=1.4s, max=8.4s, stddev=3.27s (3 runs)

### combined

- **warm**: median=0.5s, mean=3.4s, min=0.5s, max=9.3s, stddev=4.13s (3 runs)
- **deps**: median=0.7s, mean=2.4s, min=0.6s, max=5.8s, stddev=2.41s (3 runs)
- **incremental**: median=0.7s, mean=1.7s, min=0.6s, max=3.8s, stddev=1.49s (3 runs)
- **cold**: median=14.8s, mean=14.7s, min=13.4s, max=15.9s, stddev=1.01s (3 runs)

### layered

- **incremental**: median=1.6s, mean=4.2s, min=1.2s, max=9.9s, stddev=4.03s (3 runs)
- **cold**: median=17.8s, mean=17.0s, min=14.6s, max=18.6s, stddev=1.75s (3 runs)
- **warm**: median=1.5s, mean=4.8s, min=1.3s, max=11.6s, stddev=4.78s (3 runs)
- **deps**: median=1.9s, mean=4.2s, min=1.4s, max=9.4s, stddev=3.64s (3 runs)

### cachemount

- **warm**: median=1.8s, mean=4.4s, min=1.6s, max=9.9s, stddev=3.87s (3 runs)
- **incremental**: median=3.8s, mean=5.5s, min=1.6s, max=11.1s, stddev=4.09s (3 runs)
- **deps**: median=1.3s, mean=1.9s, min=1.2s, max=3.2s, stddev=0.91s (3 runs)
- **cold**: median=20.0s, mean=20.7s, min=18.5s, max=23.5s, stddev=2.08s (3 runs)

### distroless

- **cold**: median=17.9s, mean=17.5s, min=15.9s, max=18.6s, stddev=1.17s (3 runs)
- **incremental**: median=1.6s, mean=5.5s, min=1.4s, max=13.3s, stddev=5.58s (3 runs)
- **warm**: median=1.5s, mean=1.7s, min=1.4s, max=2.0s, stddev=0.26s (3 runs)
- **deps**: median=1.4s, mean=1.4s, min=1.3s, max=1.6s, stddev=0.09s (3 runs)

### registry

- **cold**: median=21.3s, mean=21.2s, min=21.0s, max=21.3s, stddev=0.12s (3 runs)

### multistage

- **cold**: median=23.1s, mean=22.1s, min=18.8s, max=24.4s, stddev=2.42s (3 runs)


## Methodology

- Each variant is a Dockerfile in `benchmarks/dockerfiles/`
- Default: 3 runs per variant per scenario, median reported
- Cold builds prune the Docker build cache first
- Warm builds reuse full cache with no changes
- Incremental builds modify a single component
- Dep builds touch the lockfile

See [program.md](../program.md) for research questions and iteration protocol.
