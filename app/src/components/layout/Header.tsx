import { cn } from "~/lib/cn";

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  return (
    <div className={cn("header", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Header</h3>
        {children}
      </div>
    </div>
  );
}
