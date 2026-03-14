import { cn } from "~/lib/cn";

export function Tooltip() {
  return (
    <div className={cn("tooltip", "")}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Tooltip</h3>
        {null}
      </div>
    </div>
  );
}
