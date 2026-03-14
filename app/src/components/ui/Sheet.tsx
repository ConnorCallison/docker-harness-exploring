import { cn } from "~/lib/cn";

interface SheetProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Sheet({ className, children, variant = "default", size = "md" }: SheetProps) {
  return (
    <div className={cn("sheet", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Sheet</h3>
        {children}
      </div>
    </div>
  );
}
