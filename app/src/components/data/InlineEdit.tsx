import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

interface InlineEditProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function InlineEdit({ className, children, data = [], loading = false }: InlineEditProps) {
  return (
    <div className={cn("inline-edit", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Inline Edit</h3>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
