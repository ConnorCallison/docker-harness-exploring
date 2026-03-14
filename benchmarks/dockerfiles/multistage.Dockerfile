# VARIANT 3: Multi-stage — separate install, build, and runtime stages
# Produces a smaller final image by discarding build artifacts.

# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY app/package.json app/bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/ .
RUN bun run build

# Stage 3: Production runtime (minimal)
FROM oven/bun:1-slim AS runtime
WORKDIR /app

# Only copy what's needed to run
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", "start"]
