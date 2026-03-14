import { cn } from "~/lib/cn";

interface SwitchFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function SwitchField({ className, children }: SwitchFieldProps) {
  return (
    <div className={cn("switch-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Switch Field</h3>
        {children}
      </div>
    </div>
  );
}
