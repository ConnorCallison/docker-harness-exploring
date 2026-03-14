import { cn } from "~/lib/cn";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartTooltipProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChartTooltip({ className, children }: ChartTooltipProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("chart-tooltip", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Chart Tooltip</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
