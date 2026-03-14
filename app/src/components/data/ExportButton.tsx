import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

interface ExportButtonProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function ExportButton({ className, children, data = [], loading = false }: ExportButtonProps) {
  return (
    <div className={cn("export-button", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Export Button</h3>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
