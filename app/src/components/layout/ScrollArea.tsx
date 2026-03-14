import { cn } from "~/lib/cn";

interface ScrollAreaProps {
  className?: string;
  children?: React.ReactNode;
}

export function ScrollArea({ className, children }: ScrollAreaProps) {
  return (
    <div className={cn("scroll-area", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Scroll Area</h3>
        {children}
      </div>
    </div>
  );
}
