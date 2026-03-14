import { cn } from "~/lib/cn";
import { useState } from "react";

interface DateFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function DateField({ className, children }: DateFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("date-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Date Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
