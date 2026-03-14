import { cn } from "~/lib/cn";

interface SystemHealthIndicatorProps {
  className?: string;
  children?: React.ReactNode;
}

export function SystemHealthIndicator({ className, children }: SystemHealthIndicatorProps) {
  return (
    <div className={cn("system-health-indicator", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">System Health Indicator</h3>
        {children}
      </div>
    </div>
  );
}
