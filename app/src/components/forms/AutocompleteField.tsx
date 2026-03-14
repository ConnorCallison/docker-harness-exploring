import { cn } from "~/lib/cn";
import { useState } from "react";

interface AutocompleteFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function AutocompleteField({ className, children }: AutocompleteFieldProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("autocomplete-field", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Autocomplete Field</h3>
        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">
          {isActive ? "Active" : "Inactive"}
        </button>
        {children}
      </div>
    </div>
  );
}
