import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

interface DataGridProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function DataGrid({ className, children, data = [], loading = false }: DataGridProps) {
  return (
    <div className={cn("data-grid", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Data Grid</h3>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
