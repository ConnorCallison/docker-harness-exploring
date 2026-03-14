import { cn } from "~/lib/cn";

interface ActivityFeedProps {
  className?: string;
  children?: React.ReactNode;
}

export function ActivityFeed({ className, children }: ActivityFeedProps) {
  return (
    <div className={cn("activity-feed", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Activity Feed</h3>
        {children}
      </div>
    </div>
  );
}
