import { cn } from "~/lib/cn";
import { useState } from "react";
import { formatNumber } from "~/lib/format";

interface ErrorBoundaryProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function ErrorBoundary({ className, children, data = [], loading = false }: ErrorBoundaryProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("error-boundary", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Error Boundary</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
