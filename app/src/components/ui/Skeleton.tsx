import { cn } from "~/lib/cn";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Skeleton({ className, children, variant = "default", size = "md" }: SkeletonProps) {
  return (
    <div className={cn("skeleton", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Skeleton</h3>
        {children}
      </div>
    </div>
  );
}
