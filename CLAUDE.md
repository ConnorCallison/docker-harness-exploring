# Docker Harness Exploring

## What This Is

A benchmark lab for Docker build performance optimization, targeting a large
Bun + React Router v7 web application. Uses autoresearch-style iterative
experimentation to find the fastest build configuration.

## Key Files

- `program.md` — Research direction, questions, and iteration protocol
- `SPEC.md` — Full project specification
- `bench.sh` — Benchmark runner entry point
- `benchmarks/dockerfiles/` — One Dockerfile per variant being tested
- `benchmarks/results/` — JSON results from benchmark runs
- `analysis/analyze.ts` — Aggregation and report generation
- `app/` — The target application (Bun + React Router v7, ~200 components)
- `scripts/generate-app.ts` — Generates the app scaffold

## Commands

```bash
# Generate app scaffold
bun run scripts/generate-app.ts

# Install app dependencies
cd app && bun install

# Run a benchmark
./bench.sh <variant> [--runs N] [--scenario cold|warm|incremental|deps]
./bench.sh combined --scenario cold --runs 3
./bench.sh --all --scenario cold

# Analyze results
bun run analysis/analyze.ts
```

## Variants

baseline, layered, multistage, cachemount, registry, combined, distroless

## Conventions

- Results are JSON files in benchmarks/results/
- Each experiment should be reproducible via bench.sh
- When adding a new Dockerfile variant, add it to benchmarks/dockerfiles/ and
  update the ALL_VARIANTS array in bench.sh
