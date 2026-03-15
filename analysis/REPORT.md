# Docker Build Benchmark Report

> Generated: 2026-03-15T02:43:05.255Z
> Results: 44 benchmark runs

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
| **baseline** | 17.5s (0.9x) | 3.0s | 2.4s | 1.5s | 437.8 MB | 10 |
| **bun-compile** | 18.9s (0.9x) | 0.5s | 0.8s | — | 192.5 MB | 4 |
| **cachemount** | 20.0s (0.8x) | 1.8s | 3.8s | 1.3s | 398.1 MB | 10 |
| **combined** | 25.8s (0.6x) | 0.8s | 27.5s | 0.7s | 430.1 MB | 10 |
| **combined-distroless** | 24.5s (0.7x) | — | — | — | 358.3 MB | 19 |
| **distroless** | 17.9s (0.9x) | 1.5s | 1.6s | 1.4s | 326.2 MB | 19 |
| **gha-optimized** | 17.2s (1.0x) | — | — | — | 367.6 MB | 10 |
| **layered** | 17.8s (0.9x) | 1.5s | 1.6s | 1.9s | 577.2 MB | 11 |
| **multistage** | 23.1s (0.7x) | — | — | — | 398.1 MB | 10 |
| **parallel** | 41.2s (0.4x) | 1.0s | 0.8s | — | 430.1 MB | 11 |
| **registry** | 21.3s (0.8x) | — | — | — | 398.1 MB | 10 |
| **test-target** | 29.5s (0.6x) | 0.5s | — | — | 430.1 MB | 10 |


## Winners

| Scenario | Best Variant | Time |
|----------|-------------|------|
| cold | **layered** | 14.6s |
| warm | **parallel** | 0.5s |
| incremental | **bun-compile** | 0.5s |
| deps | **combined** | 0.6s |

## Key Findings


Based on 44 benchmark runs across 12 variants:

1. **Cold builds**: layered was fastest at 14.6s
2. **Warm builds**: parallel at 0.5s
3. **Incremental**: bun-compile at 0.5s
4. **Dep updates**: combined at 0.6s


## Per-Variant Details

### baseline

- **deps**: median=1.5s, mean=4.1s, min=1.3s, max=9.4s, stddev=3.76s (3 runs)
- **warm**: median=3.0s, mean=2.8s, min=2.3s, max=3.2s, stddev=0.40s (3 runs)
- **cold**: median=17.5s, mean=20.7s, min=16.4s, max=28.2s, stddev=5.32s (3 runs)
- **incremental**: median=2.4s, mean=10.5s, min=2.4s, max=26.6s, stddev=11.39s (3 runs)

### parallel

- **incremental**: median=0.8s, mean=10.3s, min=0.7s, max=29.4s, stddev=13.53s (3 runs)
- **cold**: median=41.2s, mean=41.4s, min=39.2s, max=43.7s, stddev=1.83s (3 runs)
- **warm**: median=1.0s, mean=10.0s, min=0.5s, max=28.6s, stddev=13.15s (3 runs)

### bun-compile

- **incremental**: median=0.8s, mean=3.6s, min=0.5s, max=9.6s, stddev=4.23s (3 runs)
- **cold**: median=18.9s, mean=19.4s, min=18.9s, max=20.4s, stddev=0.70s (3 runs)
- **warm**: median=0.5s, mean=0.5s, min=0.5s, max=0.6s, stddev=0.03s (3 runs)

### combined

- **warm**: median=0.8s, mean=0.8s, min=0.8s, max=0.8s, stddev=0.00s (1 runs)
- **cold**: median=25.8s, mean=25.1s, min=22.3s, max=27.3s, stddev=2.10s (3 runs)
- **deps**: median=0.7s, mean=2.4s, min=0.6s, max=5.8s, stddev=2.41s (3 runs)
- **incremental**: median=27.5s, mean=27.5s, min=27.5s, max=27.5s, stddev=0.00s (1 runs)

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

### combined-distroless

- **cold**: median=24.5s, mean=24.5s, min=24.5s, max=24.5s, stddev=0.00s (1 runs)

### test-target

- **cold**: median=29.5s, mean=26.5s, min=19.8s, max=30.2s, stddev=4.73s (3 runs)
- **warm**: median=0.5s, mean=0.5s, min=0.5s, max=0.6s, stddev=0.04s (3 runs)

### registry

- **cold**: median=21.3s, mean=21.2s, min=21.0s, max=21.3s, stddev=0.12s (3 runs)

### gha-optimized

- **cold**: median=17.2s, mean=17.2s, min=17.2s, max=17.2s, stddev=0.00s (1 runs)

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
