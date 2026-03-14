import { cn } from "~/lib/cn";
import { useState } from "react";

interface FormFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function FormField({ className, children }: FormFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("form-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Form Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
