import { cn } from "~/lib/cn";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";

export function ScatterChart() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("scatter-chart", "")}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Scatter Chart</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {null}
      </div>
    </div>
  );
}
