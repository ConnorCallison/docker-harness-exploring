import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface SparklineProps {
  className?: string;
  children?: React.ReactNode;
}

export function Sparkline({ className, children }: SparklineProps) {
  return (
    <div className={cn("sparkline", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Sparkline</h3>
        {children}
      </div>
    </div>
  );
}
