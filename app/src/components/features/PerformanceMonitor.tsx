import { cn } from "~/lib/cn";

interface PerformanceMonitorProps {
  className?: string;
  children?: React.ReactNode;
}

export function PerformanceMonitor({ className, children }: PerformanceMonitorProps) {
  return (
    <div className={cn("performance-monitor", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Performance Monitor</h3>
        {children}
      </div>
    </div>
  );
}
