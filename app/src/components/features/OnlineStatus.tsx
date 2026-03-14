import { cn } from "~/lib/cn";

interface OnlineStatusProps {
  className?: string;
  children?: React.ReactNode;
}

export function OnlineStatus({ className, children }: OnlineStatusProps) {
  return (
    <div className={cn("online-status", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Online Status</h3>
        {children}
      </div>
    </div>
  );
}
