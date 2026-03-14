import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface LineChartProps {
  className?: string;
  children?: React.ReactNode;
}

export function LineChart({ className, children }: LineChartProps) {
  return (
    <div className={cn("line-chart", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Line Chart</h3>
        {children}
      </div>
    </div>
  );
}
