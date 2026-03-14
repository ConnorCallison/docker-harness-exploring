import { cn } from "~/lib/cn";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChartContainer({ className, children }: ChartContainerProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("chart-container", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Chart Container</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
