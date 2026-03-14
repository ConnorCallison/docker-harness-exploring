import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

interface SortableTableProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function SortableTable({ className, children, data = [], loading = false }: SortableTableProps) {
  return (
    <div className={cn("sortable-table", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Sortable Table</h3>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
