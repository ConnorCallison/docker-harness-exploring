import { cn } from "~/lib/cn";

interface RecentOrdersListProps {
  className?: string;
  children?: React.ReactNode;
}

export function RecentOrdersList({ className, children }: RecentOrdersListProps) {
  return (
    <div className={cn("recent-orders-list", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Recent Orders List</h3>
        {children}
      </div>
    </div>
  );
}
