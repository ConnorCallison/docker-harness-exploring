import { cn } from "~/lib/cn";

interface SliderProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Slider({ className, children, variant = "default", size = "md" }: SliderProps) {
  return (
    <div className={cn("slider", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Slider</h3>
        {children}
      </div>
    </div>
  );
}
