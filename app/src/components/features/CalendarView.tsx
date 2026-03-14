import { cn } from "~/lib/cn";
import { useState } from "react";

interface CalendarViewProps {
  className?: string;
  children?: React.ReactNode;
}

export function CalendarView({ className, children }: CalendarViewProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("calendar-view", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Calendar View</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
