import { cn } from "~/lib/cn";

interface DialogProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Dialog({ className, children, variant = "default", size = "md" }: DialogProps) {
  return (
    <div className={cn("dialog", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Dialog</h3>
        {children}
      </div>
    </div>
  );
}
