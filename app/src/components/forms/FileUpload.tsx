import { cn } from "~/lib/cn";
import { useState } from "react";

interface FileUploadProps {
  className?: string;
  children?: React.ReactNode;
}

export function FileUpload({ className, children }: FileUploadProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("file-upload", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">File Upload</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
