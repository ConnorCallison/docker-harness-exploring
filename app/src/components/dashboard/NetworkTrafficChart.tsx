import { cn } from "~/lib/cn";

interface NetworkTrafficChartProps {
  className?: string;
  children?: React.ReactNode;
}

export function NetworkTrafficChart({ className, children }: NetworkTrafficChartProps) {
  return (
    <div className={cn("network-traffic-chart", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Network Traffic Chart</h3>
        {children}
      </div>
    </div>
  );
}
