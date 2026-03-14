import { cn } from "~/lib/cn";

interface SeparatorProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Separator({ className, children, variant = "default", size = "md" }: SeparatorProps) {
  return (
    <div className={cn("separator", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Separator</h3>
        {children}
      </div>
    </div>
  );
}
