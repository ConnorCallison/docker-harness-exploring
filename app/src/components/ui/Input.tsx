import { cn } from "~/lib/cn";

interface InputProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Input({ className, children, variant = "default", size = "md" }: InputProps) {
  return (
    <div className={cn("input", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Input</h3>
        {children}
      </div>
    </div>
  );
}
