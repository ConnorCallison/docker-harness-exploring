import { cn } from "~/lib/cn";

interface DatePickerProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function DatePicker({ className, children, variant = "default", size = "md" }: DatePickerProps) {
  return (
    <div className={cn("date-picker", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Date Picker</h3>
        {children}
      </div>
    </div>
  );
}
