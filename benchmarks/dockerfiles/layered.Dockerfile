# VARIANT 2: Layered — Optimized layer ordering
# Key insight: copy lockfile first, install deps, THEN copy source.
# This way, source changes don't invalidate the dependency layer.

FROM oven/bun:1

WORKDIR /app

# Layer 1: dependency manifest (changes rarely)
COPY app/package.json app/bun.lockb ./

# Layer 2: install dependencies (cached when lockfile unchanged)
RUN bun install --frozen-lockfile

# Layer 3: source code (changes frequently)
COPY app/ .

# Layer 4: build
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
