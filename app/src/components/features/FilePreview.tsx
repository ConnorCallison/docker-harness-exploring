import { cn } from "~/lib/cn";
import { useState } from "react";

interface FilePreviewProps {
  className?: string;
  children?: React.ReactNode;
}

export function FilePreview({ className, children }: FilePreviewProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("file-preview", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">File Preview</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
