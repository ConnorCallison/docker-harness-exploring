import { cn } from "~/lib/cn";

interface ToastProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Toast({ className, children, variant = "default", size = "md" }: ToastProps) {
  return (
    <div className={cn("toast", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Toast</h3>
        {children}
      </div>
    </div>
  );
}
