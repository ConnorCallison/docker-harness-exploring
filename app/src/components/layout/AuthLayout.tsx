import { cn } from "~/lib/cn";

interface AuthLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export function AuthLayout({ className, children }: AuthLayoutProps) {
  return (
    <div className={cn("auth-layout", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Auth Layout</h3>
        {children}
      </div>
    </div>
  );
}
