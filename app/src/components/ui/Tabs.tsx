import { cn } from "~/lib/cn";

interface TabsProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Tabs({ className, children, variant = "default", size = "md" }: TabsProps) {
  return (
    <div className={cn("tabs", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Tabs</h3>
        {children}
      </div>
    </div>
  );
}
