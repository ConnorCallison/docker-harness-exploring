/**
 * Benchmark Analysis Tool
 *
 * Reads all JSON results from benchmarks/results/ and produces:
 * 1. Console comparison table
 * 2. Markdown report in analysis/REPORT.md
 *
 * Usage: bun run analysis/analyze.ts
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface RunResult {
  build_time_s: number;
  image_size_mb: number;
  layer_count: number;
}

interface BenchmarkResult {
  variant: string;
  scenario: string;
  timestamp: string;
  runs: RunResult[];
  median_build_time_s: number;
  environment: {
    os: string;
    arch: string;
    docker_version: string;
    cpu: string;
    ram_gb: number;
  };
}

const RESULTS_DIR = join(import.meta.dirname, "../benchmarks/results");
const REPORT_PATH = join(import.meta.dirname, "REPORT.md");

// Load all results
function loadResults(): BenchmarkResult[] {
  const files = readdirSync(RESULTS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const content = readFileSync(join(RESULTS_DIR, f), "utf-8");
    return JSON.parse(content) as BenchmarkResult;
  });
}

// Group results by variant, taking latest per (variant, scenario) pair
function groupByVariant(results: BenchmarkResult[]) {
  const map = new Map<string, Map<string, BenchmarkResult>>();

  for (const r of results) {
    if (!map.has(r.variant)) map.set(r.variant, new Map());
    const existing = map.get(r.variant)!.get(r.scenario);
    if (!existing || r.timestamp > existing.timestamp) {
      map.get(r.variant)!.set(r.scenario, r);
    }
  }

  return map;
}

// Calculate statistics
function stats(runs: RunResult[]) {
  const times = runs.map((r) => r.build_time_s).sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)];
  const mean = times.reduce((a, b) => a + b, 0) / times.length;
  const min = times[0];
  const max = times[times.length - 1];
  const stddev = Math.sqrt(times.reduce((sum, t) => sum + (t - mean) ** 2, 0) / times.length);

  return { median, mean, min, max, stddev };
}

// Format seconds nicely
function fmtTime(s: number): string {
  if (s < 60) return `${s.toFixed(1)}s`;
  return `${Math.floor(s / 60)}m${(s % 60).toFixed(0)}s`;
}

// Generate comparison table
function generateTable(grouped: Map<string, Map<string, BenchmarkResult>>): string {
  const variants = [...grouped.keys()].sort();
  const scenarios = ["cold", "warm", "incremental", "deps"];

  let table = "| Variant |";
  for (const s of scenarios) table += ` ${s} |`;
  table += " Image Size | Layers |\n";

  table += "|---------|";
  for (const _ of scenarios) table += "----------|";
  table += "------------|--------|\n";

  // Find baseline cold time for speedup calculation
  const baselineCold = grouped.get("baseline")?.get("cold")?.median_build_time_s ?? 1;

  for (const variant of variants) {
    const scenarioMap = grouped.get(variant)!;
    table += `| **${variant}** |`;

    for (const scenario of scenarios) {
      const result = scenarioMap.get(scenario);
      if (result) {
        const s = stats(result.runs);
        const speedup = scenario === "cold" ? ` (${(baselineCold / s.median).toFixed(1)}x)` : "";
        table += ` ${fmtTime(s.median)}${speedup} |`;
      } else {
        table += ` — |`;
      }
    }

    // Image size and layers from latest result
    const anyResult = [...scenarioMap.values()][0];
    if (anyResult && anyResult.runs.length > 0) {
      table += ` ${anyResult.runs[0].image_size_mb} MB |`;
      table += ` ${anyResult.runs[0].layer_count} |`;
    } else {
      table += ` — | — |`;
    }

    table += "\n";
  }

  return table;
}

// Generate full report
function generateReport(results: BenchmarkResult[], grouped: Map<string, Map<string, BenchmarkResult>>): string {
  const env = results[0]?.environment;
  const table = generateTable(grouped);

  // Find best variant per scenario
  const scenarios = ["cold", "warm", "incremental", "deps"];
  const winners: Record<string, { variant: string; time: number }> = {};

  for (const scenario of scenarios) {
    let best = { variant: "none", time: Infinity };
    for (const [variant, scenarioMap] of grouped) {
      const result = scenarioMap.get(scenario);
      if (result && result.median_build_time_s < best.time) {
        best = { variant, time: result.median_build_time_s };
      }
    }
    winners[scenario] = best;
  }

  return `# Docker Build Benchmark Report

> Generated: ${new Date().toISOString()}
> Results: ${results.length} benchmark runs

## Environment

| Property | Value |
|----------|-------|
| OS | ${env?.os ?? "unknown"} |
| Arch | ${env?.arch ?? "unknown"} |
| Docker | ${env?.docker_version ?? "unknown"} |
| CPU | ${env?.cpu ?? "unknown"} |
| RAM | ${env?.ram_gb ?? "unknown"} GB |

## Results

${table}

## Winners

| Scenario | Best Variant | Time |
|----------|-------------|------|
${scenarios.map((s) => `| ${s} | **${winners[s].variant}** | ${fmtTime(winners[s].time)} |`).join("\n")}

## Key Findings

${results.length === 0 ? "_No results yet. Run `./bench.sh <variant>` to generate data._" : `
Based on ${results.length} benchmark runs across ${grouped.size} variants:

1. **Cold builds**: ${winners.cold.variant} was fastest at ${fmtTime(winners.cold.time)}
2. **Warm builds**: ${winners.warm?.variant ?? "not tested"} ${winners.warm?.time ? `at ${fmtTime(winners.warm.time)}` : ""}
3. **Incremental**: ${winners.incremental?.variant ?? "not tested"} ${winners.incremental?.time ? `at ${fmtTime(winners.incremental.time)}` : ""}
4. **Dep updates**: ${winners.deps?.variant ?? "not tested"} ${winners.deps?.time ? `at ${fmtTime(winners.deps.time)}` : ""}
`}

## Per-Variant Details

${[...grouped.entries()]
  .map(([variant, scenarioMap]) => {
    let detail = `### ${variant}\n\n`;
    for (const [scenario, result] of scenarioMap) {
      const s = stats(result.runs);
      detail += `- **${scenario}**: median=${fmtTime(s.median)}, mean=${fmtTime(s.mean)}, min=${fmtTime(s.min)}, max=${fmtTime(s.max)}, stddev=${s.stddev.toFixed(2)}s (${result.runs.length} runs)\n`;
    }
    return detail;
  })
  .join("\n")}

## Methodology

- Each variant is a Dockerfile in \`benchmarks/dockerfiles/\`
- Default: 3 runs per variant per scenario, median reported
- Cold builds prune the Docker build cache first
- Warm builds reuse full cache with no changes
- Incremental builds modify a single component
- Dep builds touch the lockfile

See [program.md](../program.md) for research questions and iteration protocol.
`;
}

// --- Main ---
console.log("Loading benchmark results...\n");

const results = loadResults();
console.log(`Found ${results.length} result files\n`);

if (results.length === 0) {
  console.log("No results yet. Run benchmarks first:");
  console.log("  ./bench.sh baseline --scenario cold");
  console.log("  ./bench.sh layered --scenario cold");
  console.log("  ./bench.sh combined --scenario cold");
  console.log("  etc.");
  process.exit(0);
}

const grouped = groupByVariant(results);

// Console output
console.log("=== Comparison Table ===\n");
console.log(generateTable(grouped));

// Write report
const report = generateReport(results, grouped);
writeFileSync(REPORT_PATH, report);
console.log(`\nFull report written to: ${REPORT_PATH}`);
