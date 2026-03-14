import { cn } from "~/lib/cn";
import { useState } from "react";

interface TextareaFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function TextareaField({ className, children }: TextareaFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("textarea-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Textarea Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
