import { cn } from "~/lib/cn";

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlock({ className, children }: CodeBlockProps) {
  return (
    <div className={cn("code-block", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Code Block</h3>
        {children}
      </div>
    </div>
  );
}
