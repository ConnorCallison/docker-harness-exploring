import { cn } from "~/lib/cn";

interface DiffViewerProps {
  className?: string;
  children?: React.ReactNode;
}

export function DiffViewer({ className, children }: DiffViewerProps) {
  return (
    <div className={cn("diff-viewer", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Diff Viewer</h3>
        {children}
      </div>
    </div>
  );
}
