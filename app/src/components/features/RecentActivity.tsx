import { cn } from "~/lib/cn";

interface RecentActivityProps {
  className?: string;
  children?: React.ReactNode;
}

export function RecentActivity({ className, children }: RecentActivityProps) {
  return (
    <div className={cn("recent-activity", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        {children}
      </div>
    </div>
  );
}
