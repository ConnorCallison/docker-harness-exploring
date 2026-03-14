import { cn } from "~/lib/cn";

interface BadgeProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Badge({ className, children, variant = "default", size = "md" }: BadgeProps) {
  return (
    <div className={cn("badge", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Badge</h3>
        {children}
      </div>
    </div>
  );
}
