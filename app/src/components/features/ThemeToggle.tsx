import { cn } from "~/lib/cn";

interface ThemeToggleProps {
  className?: string;
  children?: React.ReactNode;
}

export function ThemeToggle({ className, children }: ThemeToggleProps) {
  return (
    <div className={cn("theme-toggle", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Theme Toggle</h3>
        {children}
      </div>
    </div>
  );
}
