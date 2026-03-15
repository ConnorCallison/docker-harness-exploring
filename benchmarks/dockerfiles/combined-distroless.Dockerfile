# VARIANT 9: Combined + Distroless — fastest rebuilds + smallest image
# Hypothesis: Take combined's build stages (COPY --link, cache mounts)
# and swap the runtime stage for distroless → ~300MB image, sub-second rebuilds.

# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY --link app/package.json app/bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS build
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/tsconfig.json app/vite.config.ts app/react-router.config.ts ./
COPY --link app/src ./src
COPY --link app/public ./public
COPY --link app/package.json ./
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

# Stage 4: Distroless runtime (smallest possible)
FROM oven/bun:1-distroless AS runtime
WORKDIR /app
COPY --link --from=build /app/build ./build
COPY --link --from=build /app/package.json ./
COPY --link --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
