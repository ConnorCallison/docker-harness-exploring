import { cn } from "~/lib/cn";
import { useState } from "react";

interface KanbanBoardProps {
  className?: string;
  children?: React.ReactNode;
}

export function KanbanBoard({ className, children }: KanbanBoardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("kanban-board", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Kanban Board</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
