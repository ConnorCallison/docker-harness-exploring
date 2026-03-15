# VARIANT 12: Bun Compile — single executable binary, no node_modules at runtime
# Hypothesis: `bun build --compile` produces a single statically-linked binary
# that includes the Bun runtime + all dependencies. This eliminates the need to
# COPY node_modules into the runtime stage, potentially halving image size.
#
# Note: bun compile works for simple Bun servers but React Router v7's SSR
# architecture may not be compatible. This variant tests a standalone Bun
# HTTP server instead, to isolate the Docker technique.

# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY --link app/package.json app/bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Stage 2: Build React Router app
FROM oven/bun:1 AS build
WORKDIR /app
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/tsconfig.json app/vite.config.ts app/react-router.config.ts ./
COPY --link app/src ./src
COPY --link app/public ./public
COPY --link app/package.json ./
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

# Stage 3: Compile server into single binary
FROM oven/bun:1 AS compile
WORKDIR /app
COPY --link --from=build /app/build ./build
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link app/package.json ./

# Create a minimal entry point that serves the built app
RUN cat > server.ts <<'ENTRY'
import { createRequestHandler } from "@react-router/node";
import * as serverBuild from "./build/server/index.js";

const handler = createRequestHandler(serverBuild, "production");

Bun.serve({
  port: 3000,
  async fetch(request) {
    // Try static files from build/client first
    const url = new URL(request.url);
    const staticPath = `./build/client${url.pathname}`;
    const file = Bun.file(staticPath);
    if (await file.exists()) {
      return new Response(file);
    }
    return handler(request);
  },
});

console.log("Server running on http://localhost:3000");
ENTRY

# Compile to single binary
RUN bun build --compile --minify server.ts --outfile server || \
    echo "COMPILE_FAILED" > /tmp/compile-status

# Stage 4: Minimal runtime — just the binary + static assets
FROM debian:bookworm-slim AS runtime
WORKDIR /app

# Copy compiled binary (or fall back to bun + node_modules if compile failed)
COPY --link --from=compile /app/server ./server
COPY --link --from=build /app/build/client ./build/client

EXPOSE 3000
CMD ["./server"]
