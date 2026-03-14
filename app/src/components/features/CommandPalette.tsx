import { cn } from "~/lib/cn";

interface CommandPaletteProps {
  className?: string;
  children?: React.ReactNode;
}

export function CommandPalette({ className, children }: CommandPaletteProps) {
  return (
    <div className={cn("command-palette", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Command Palette</h3>
        {children}
      </div>
    </div>
  );
}
