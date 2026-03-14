import { cn } from "~/lib/cn";
import { useState } from "react";

interface DropdownMenuProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function DropdownMenu({ className, children, variant = "default", size = "md" }: DropdownMenuProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("dropdown-menu", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Dropdown Menu</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
