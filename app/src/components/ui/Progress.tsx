import { cn } from "~/lib/cn";

interface ProgressProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Progress({ className, children, variant = "default", size = "md" }: ProgressProps) {
  return (
    <div className={cn("progress", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Progress</h3>
        {children}
      </div>
    </div>
  );
}
