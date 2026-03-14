import { cn } from "~/lib/cn";
import { useState } from "react";

interface CheckboxFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function CheckboxField({ className, children }: CheckboxFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("checkbox-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Checkbox Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
