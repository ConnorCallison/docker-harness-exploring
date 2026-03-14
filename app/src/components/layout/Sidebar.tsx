import { cn } from "~/lib/cn";
import { useState } from "react";

export function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("sidebar", "")}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Sidebar</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {null}
      </div>
    </div>
  );
}
