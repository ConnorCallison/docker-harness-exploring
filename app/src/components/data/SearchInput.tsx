import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

interface SearchInputProps {
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>[];
  loading?: boolean;
}

export function SearchInput({ className, children, data = [], loading = false }: SearchInputProps) {
  return (
    <div className={cn("search-input", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Search Input</h3>
        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}
        {children}
      </div>
    </div>
  );
}
