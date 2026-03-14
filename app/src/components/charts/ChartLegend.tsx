import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface ChartLegendProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChartLegend({ className, children }: ChartLegendProps) {
  return (
    <div className={cn("chart-legend", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Chart Legend</h3>
        {children}
      </div>
    </div>
  );
}
