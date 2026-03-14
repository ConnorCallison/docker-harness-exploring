import { cn } from "~/lib/cn";
import { useState } from "react";

interface FormMessageProps {
  className?: string;
  children?: React.ReactNode;
}

export function FormMessage({ className, children }: FormMessageProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("form-message", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Form Message</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
