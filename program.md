# Docker Build Harness — Research Program

> Autoresearch-style iterative benchmarking of Docker build/cache strategies
> for a large Bun + React Router v7 web application.

## Goal

Find the **fastest possible Docker build configuration** across three environments:

1. **Local development** — cold + warm builds on macOS (Apple Silicon)
2. **CI (GitHub Actions)** — ephemeral runners with registry cache
3. **Self-hosted runners** — persistent cache on disk

The success metric is **wall-clock build time** (seconds), measured at:
- Cold build (no cache)
- Warm build (no source changes)
- Incremental build (single component changed)
- Dependency update (lockfile changed)

## Constraints

- Runtime: **Bun** (not Node)
- Framework: **React Router v7** (framework mode, SSR)
- App size: ~200 components, ~50 routes, realistic dependency tree
- Must produce a production-ready container (small, secure, runs on port 3000)
- Each experiment must be reproducible via a single `./bench.sh <variant>` command
- Results are appended to `benchmarks/results/` as JSON for analysis

## Experiment Variants

Each variant is a Dockerfile in `benchmarks/dockerfiles/`:

| # | Variant | Key Technique |
|---|---------|---------------|
| 1 | `baseline.Dockerfile` | Naive single-stage, COPY everything |
| 2 | `layered.Dockerfile` | Optimized layer ordering (lockfile first) |
| 3 | `multistage.Dockerfile` | Multi-stage: install → build → runtime |
| 4 | `cachemount.Dockerfile` | `--mount=type=cache` for bun install + build |
| 5 | `registry.Dockerfile` | External cache via `--cache-to/from` registry |
| 6 | `combined.Dockerfile` | Best of all above combined |
| 7 | `distroless.Dockerfile` | Minimal runtime (distroless/static) |

## Iteration Protocol

Inspired by [karpathy/autoresearch](https://github.com/karpathy/autoresearch):

1. **Hypothesize** — pick a technique expected to improve build time
2. **Implement** — write/modify a Dockerfile variant
3. **Benchmark** — run `./bench.sh <variant>` (3 runs, take median)
4. **Record** — results auto-saved to `benchmarks/results/<variant>-<timestamp>.json`
5. **Analyze** — run `bun run analyze` to generate comparison table
6. **Decide** — keep, discard, or combine with other techniques
7. **Repeat**

## What We're Measuring

```
build_time_cold_s        — full build, no cache
build_time_warm_s        — rebuild, no changes
build_time_incremental_s — rebuild, one component changed
build_time_deps_s        — rebuild, lockfile changed
image_size_mb            — final image size
layer_count              — number of layers in final image
cache_size_mb            — size of build cache used
```

## Research Questions

1. How much does `--mount=type=cache` for bun's install cache actually save?
2. What's the optimal layer ordering for a Bun/RR7 app with SSR?
3. Is multi-stage worth the complexity for Bun (which has no native compilation)?
4. Can we get CI builds under 30s with registry cache?
5. What's the smallest production image we can produce?
6. Does `COPY --link` meaningfully help with layer reuse?
7. How does `.dockerignore` scope affect cache invalidation frequency?
