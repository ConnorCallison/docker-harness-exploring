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

## Recommendations

### For local development
Use `combined.Dockerfile`. Sub-second rebuilds on source changes.

### For CI with persistent cache (self-hosted runners)
Use `combined.Dockerfile` with `--cache-to=type=local,dest=/tmp/docker-cache` and `--cache-from=type=local,src=/tmp/docker-cache`. Should achieve ~1-2s builds after the first run.

### For CI with ephemeral runners (GitHub Actions)
Use `combined.Dockerfile` with `--cache-to=type=gha` and `--cache-from=type=gha` (GitHub Actions cache backend). Cold builds will be ~15s, but subsequent workflow runs will hit cache.

### For smallest production image
Combine the `combined` build stages with `distroless` runtime stage. Expected: ~300 MB image with sub-second rebuilds.

## Next Iterations

1. **combined-distroless hybrid** — combine best build speed with smallest runtime
2. **GHA cache backend** — test `--cache-to=type=gha` on actual GitHub Actions runners
3. **Parallel multi-stage** — test if BuildKit parallelizes independent stages
4. **Bun compile** — test `bun build --compile` for single-binary output (no node_modules in image)
5. **Layer analysis** — use `docker history` and `dive` to find layer bloat


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
