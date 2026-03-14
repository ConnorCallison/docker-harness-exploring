# VARIANT 4: Cache Mounts — use BuildKit cache mounts for bun install + build
# --mount=type=cache persists across builds without being in the image.
# This is the key Docker optimization for package managers.

# syntax=docker/dockerfile:1

FROM oven/bun:1 AS deps
WORKDIR /app
COPY app/package.json app/bun.lockb ./

# Cache bun's global cache directory across builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/ .

# Cache Vite/React Router build cache
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

FROM oven/bun:1-slim AS runtime
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", "start"]
