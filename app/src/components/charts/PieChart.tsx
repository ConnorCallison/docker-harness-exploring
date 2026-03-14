import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface PieChartProps {
  className?: string;
  children?: React.ReactNode;
}

export function PieChart({ className, children }: PieChartProps) {
  return (
    <div className={cn("pie-chart", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Pie Chart</h3>
        {children}
      </div>
    </div>
  );
}
