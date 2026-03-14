import { cn } from "~/lib/cn";
import { useState } from "react";

interface SelectProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Select({ className, children, variant = "default", size = "md" }: SelectProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("select", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Select</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
