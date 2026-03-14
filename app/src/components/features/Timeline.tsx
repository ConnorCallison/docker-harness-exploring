import { cn } from "~/lib/cn";
import { useState } from "react";

interface TimelineProps {
  className?: string;
  children?: React.ReactNode;
}

export function Timeline({ className, children }: TimelineProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("timeline", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Timeline</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
