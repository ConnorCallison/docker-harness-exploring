import { cn } from "~/lib/cn";

interface AlertProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Alert({ className, children, variant = "default", size = "md" }: AlertProps) {
  return (
    <div className={cn("alert", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Alert</h3>
        {children}
      </div>
    </div>
  );
}
