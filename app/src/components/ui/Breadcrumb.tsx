import { cn } from "~/lib/cn";

interface BreadcrumbProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Breadcrumb({ className, children, variant = "default", size = "md" }: BreadcrumbProps) {
  return (
    <div className={cn("breadcrumb", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Breadcrumb</h3>
        {children}
      </div>
    </div>
  );
}
