import { cn } from "~/lib/cn";

interface MemoryUsageChartProps {
  className?: string;
  children?: React.ReactNode;
}

export function MemoryUsageChart({ className, children }: MemoryUsageChartProps) {
  return (
    <div className={cn("memory-usage-chart", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Memory Usage Chart</h3>
        {children}
      </div>
    </div>
  );
}
