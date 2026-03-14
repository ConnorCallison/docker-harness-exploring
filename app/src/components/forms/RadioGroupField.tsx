import { cn } from "~/lib/cn";
import { useState } from "react";

interface RadioGroupFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroupField({ className, children }: RadioGroupFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("radio-group-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Radio Group Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
