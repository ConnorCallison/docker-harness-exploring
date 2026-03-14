import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface MetricCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function MetricCard({ className, children }: MetricCardProps) {
  return (
    <div className={cn("metric-card", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Metric Card</h3>
        {children}
      </div>
    </div>
  );
}
