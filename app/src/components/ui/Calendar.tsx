import { cn } from "~/lib/cn";

interface CalendarProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Calendar({ className, children, variant = "default", size = "md" }: CalendarProps) {
  return (
    <div className={cn("calendar", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Calendar</h3>
        {children}
      </div>
    </div>
  );
}
