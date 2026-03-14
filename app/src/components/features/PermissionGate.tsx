import { cn } from "~/lib/cn";
import { useState } from "react";

interface PermissionGateProps {
  className?: string;
  children?: React.ReactNode;
}

export function PermissionGate({ className, children }: PermissionGateProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("permission-gate", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Permission Gate</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
