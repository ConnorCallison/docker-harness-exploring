import { cn } from "~/lib/cn";
import { useState } from "react";

interface ToggleProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Toggle({ className, children, variant = "default", size = "md" }: ToggleProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("toggle", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Toggle</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
