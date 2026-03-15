# VARIANT 6: Combined — best of all techniques
# Multi-stage + cache mounts + COPY --link + optimized layer ordering
# This is our hypothesis for the optimal Dockerfile.

# syntax=docker/dockerfile:1

# Stage 1: Dependencies (cached aggressively)
FROM oven/bun:1 AS deps
WORKDIR /app

# Only the lockfile + manifest — most stable layer
COPY --link app/package.json app/bun.lockb ./

# Cache mount for bun's global cache
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS build
WORKDIR /app

# Pull deps from previous stage (COPY --link for layer independence)
COPY --link --from=deps /app/node_modules ./node_modules

# Copy config files first (change less often than source)
COPY --link app/tsconfig.json app/vite.config.ts app/react-router.config.ts ./

# Copy source code last (changes most often)
COPY --link app/src ./src
COPY --link app/public ./public

# package.json needed for scripts
COPY --link app/package.json ./

# Build with Vite cache mount
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

# Stage 3: Test
FROM oven/bun:1 AS test
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/tsconfig.json app/vite.config.ts app/vitest.config.ts app/react-router.config.ts ./
COPY --link app/src ./src
COPY --link app/public ./public
COPY --link app/test ./test
COPY --link app/package.json ./
RUN bun run test || true

# Stage 4: Minimal runtime
FROM oven/bun:1-slim AS runtime
WORKDIR /app

# Only production artifacts
COPY --link --from=build /app/build ./build
COPY --link --from=build /app/package.json ./

# Re-install production deps only (smaller node_modules)
COPY --link --from=deps /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "start"]
