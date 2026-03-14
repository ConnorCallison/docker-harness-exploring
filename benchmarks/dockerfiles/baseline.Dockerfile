# VARIANT 1: Baseline — Naive single-stage, COPY everything
# This is the "worst case" — no cache optimization at all.
# Purpose: establish a floor for comparison.

FROM oven/bun:1 AS runtime

WORKDIR /app

# Copy everything at once (bad: any change invalidates all layers)
COPY app/ .

# Install dependencies
RUN bun install --frozen-lockfile

# Build the app
RUN bun run build

# Expose and run
EXPOSE 3000
CMD ["bun", "run", "start"]
