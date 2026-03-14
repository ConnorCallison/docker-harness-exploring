import { cn } from "~/lib/cn";

interface LatencyGraphProps {
  className?: string;
  children?: React.ReactNode;
}

export function LatencyGraph({ className, children }: LatencyGraphProps) {
  return (
    <div className={cn("latency-graph", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Latency Graph</h3>
        {children}
      </div>
    </div>
  );
}
