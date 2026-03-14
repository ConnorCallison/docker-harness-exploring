# Docker Harness Exploring — Specification

## Overview

This repo is a **benchmark lab** for Docker build performance optimization.
It contains a realistic Bun + React Router v7 application and a harness that
measures build times across multiple Dockerfile strategies.

The methodology is autoresearch-style: small, controlled experiments with
automated measurement, producing data that drives the next experiment.

## Repository Structure

```
.
├── program.md                    # Research direction (autoresearch-style)
├── SPEC.md                       # This file — project specification
├── app/                          # The target application
│   ├── package.json
│   ├── bun.lock
│   ├── react-router.config.ts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── src/
│   │   ├── root.tsx
│   │   ├── entry.server.tsx
│   │   ├── entry.client.tsx
│   │   ├── routes/              # ~50 route modules
│   │   ├── components/          # ~200 components
│   │   └── lib/                 # Utilities, hooks, etc.
│   └── public/
├── benchmarks/
│   ├── dockerfiles/             # One Dockerfile per variant
│   ├── scripts/                 # Benchmark runner, utilities
│   └── results/                 # JSON results per run
├── analysis/
│   ├── analyze.ts               # Aggregation + comparison
│   └── report.ts                # Markdown report generator
├── .github/workflows/
│   └── benchmark.yml            # CI benchmark workflow
├── bench.sh                     # Entry point: ./bench.sh <variant>
├── .dockerignore
└── .gitignore
```

## App Requirements

The app must be **realistic enough** to stress Docker build caching:

- ~200 components across multiple directories
- ~50 route files with loaders/actions
- Heavy dependency tree (~80+ packages)
- TypeScript everywhere
- SSR enabled (React Router v7 framework mode)
- Tailwind CSS for styles
- At least one large dependency (e.g., chart library, date-fns, zod)

This ensures builds take meaningful time and cache behavior is representative.

## Benchmark Harness

### `bench.sh <variant> [--runs N] [--scenario cold|warm|incremental|deps]`

1. Selects the Dockerfile from `benchmarks/dockerfiles/<variant>.Dockerfile`
2. Optionally prunes Docker build cache (for cold runs)
3. Runs the build N times (default 3)
4. Records timing, image size, layer count, cache size
5. Saves results to `benchmarks/results/<variant>-<timestamp>.json`

### Result Format

```json
{
  "variant": "multistage",
  "timestamp": "2026-03-14T12:00:00Z",
  "scenario": "cold",
  "runs": [
    { "build_time_s": 45.2, "image_size_mb": 120, "layer_count": 12, "cache_size_mb": 340 }
  ],
  "median_build_time_s": 45.2,
  "environment": {
    "os": "darwin",
    "arch": "arm64",
    "docker_version": "27.x",
    "cpu": "Apple M3 Pro",
    "ram_gb": 36
  }
}
```

## Success Criteria

By the end of this research:

1. We have data-driven conclusions for each research question in program.md
2. A "best practice" Dockerfile that combines winning techniques
3. A GitHub Actions workflow that demonstrates fast CI builds
4. A written report with charts comparing all variants
5. Clear recommendations for teams building similar apps
