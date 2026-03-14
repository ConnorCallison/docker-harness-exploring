import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface AreaChartProps {
  className?: string;
  children?: React.ReactNode;
}

export function AreaChart({ className, children }: AreaChartProps) {
  return (
    <div className={cn("area-chart", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Area Chart</h3>
        {children}
      </div>
    </div>
  );
}
