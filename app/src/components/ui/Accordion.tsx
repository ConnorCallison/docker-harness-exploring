import { cn } from "~/lib/cn";

interface AccordionProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Accordion({ className, children, variant = "default", size = "md" }: AccordionProps) {
  return (
    <div className={cn("accordion", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Accordion</h3>
        {children}
      </div>
    </div>
  );
}
