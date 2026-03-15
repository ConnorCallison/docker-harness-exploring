# VARIANT 11: Test Target — use --target to run tests OR build independently
# Hypothesis: In CI, you often want to run tests without building the production
# image (e.g., on PRs). Using `docker build --target test` lets you skip the
# build stage entirely. This measures test-only execution time.
#
# Usage:
#   docker build --target test -f test-target.Dockerfile .    # Run tests only
#   docker build --target runtime -f test-target.Dockerfile .  # Full build (no tests)
#   docker build -f test-target.Dockerfile .                   # Full build (default)

# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY --link app/package.json app/bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Stage 2: Test (independent, reachable via --target test)
FROM oven/bun:1 AS test
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/tsconfig.json app/vite.config.ts app/vitest.config.ts app/react-router.config.ts ./
COPY --link app/src ./src
COPY --link app/public ./public
COPY --link app/test ./test
COPY --link app/package.json ./
RUN bun run test || true

# Stage 3: Build (independent, no test dependency)
FROM oven/bun:1 AS build
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/tsconfig.json app/vite.config.ts app/react-router.config.ts ./
COPY --link app/src ./src
COPY --link app/public ./public
COPY --link app/package.json ./
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

# Stage 4: Runtime (production image, no test dependency)
FROM oven/bun:1-slim AS runtime
WORKDIR /app
COPY --link --from=build /app/build ./build
COPY --link --from=build /app/package.json ./
COPY --link --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
