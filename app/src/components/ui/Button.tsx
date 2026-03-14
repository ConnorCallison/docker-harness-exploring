import { cn } from "~/lib/cn";
import { useState } from "react";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, children, variant = "default", size = "md" }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("button", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Button</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
// Incremental change: 1773517074
// Incremental change: 1773517086
// Incremental change: 1773517099
// Incremental change: 1773517105
// Incremental change: 1773517122
