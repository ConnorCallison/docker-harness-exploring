import { cn } from "~/lib/cn";

interface UserMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export function UserMenu({ className, children }: UserMenuProps) {
  return (
    <div className={cn("user-menu", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">User Menu</h3>
        {children}
      </div>
    </div>
  );
}
