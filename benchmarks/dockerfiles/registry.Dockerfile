# VARIANT 5: Registry Cache — external cache via --cache-to/from
# For CI environments where the builder is ephemeral.
# NOTE: This Dockerfile is identical to cachemount — the difference
# is in the build command (--cache-to/from flags in bench.sh).

# syntax=docker/dockerfile:1

FROM oven/bun:1 AS deps
WORKDIR /app
COPY app/package.json app/bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/ .
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

FROM oven/bun:1-slim AS runtime
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", "start"]
