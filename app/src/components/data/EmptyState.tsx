import { cn } from "~/lib/cn";
import { formatNumber } from "~/lib/format";

export function EmptyState() {
  return (
    <div className={cn("empty-state", "")}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Empty State</h3>
        {null}
      </div>
    </div>
  );
}
