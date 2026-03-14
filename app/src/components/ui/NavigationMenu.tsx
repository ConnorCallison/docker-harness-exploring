import { cn } from "~/lib/cn";

interface NavigationMenuProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function NavigationMenu({ className, children, variant = "default", size = "md" }: NavigationMenuProps) {
  return (
    <div className={cn("navigation-menu", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Navigation Menu</h3>
        {children}
      </div>
    </div>
  );
}
