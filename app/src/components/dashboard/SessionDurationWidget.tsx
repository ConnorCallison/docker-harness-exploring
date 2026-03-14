import { cn } from "~/lib/cn";

interface SessionDurationWidgetProps {
  className?: string;
  children?: React.ReactNode;
}

export function SessionDurationWidget({ className, children }: SessionDurationWidgetProps) {
  return (
    <div className={cn("session-duration-widget", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Session Duration Widget</h3>
        {children}
      </div>
    </div>
  );
}
