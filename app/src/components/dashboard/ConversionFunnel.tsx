import { cn } from "~/lib/cn";

interface ConversionFunnelProps {
  className?: string;
  children?: React.ReactNode;
}

export function ConversionFunnel({ className, children }: ConversionFunnelProps) {
  return (
    <div className={cn("conversion-funnel", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Conversion Funnel</h3>
        {children}
      </div>
    </div>
  );
}
