# VARIANT 7: Distroless — minimal runtime with Google's distroless base
# Goal: smallest possible production image.
# Trade-off: no shell, harder to debug in production.

# syntax=docker/dockerfile:1

FROM oven/bun:1 AS deps
WORKDIR /app
COPY --link app/package.json app/bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/ .
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

# Stage 3: Distroless runtime
# Using debian-slim as a proxy for distroless since bun needs glibc
FROM oven/bun:1-distroless AS runtime
WORKDIR /app

COPY --link --from=build /app/build ./build
COPY --link --from=build /app/node_modules ./node_modules
COPY --link --from=build /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "start"]
