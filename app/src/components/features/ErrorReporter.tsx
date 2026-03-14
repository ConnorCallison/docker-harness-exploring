import { cn } from "~/lib/cn";

interface ErrorReporterProps {
  className?: string;
  children?: React.ReactNode;
}

export function ErrorReporter({ className, children }: ErrorReporterProps) {
  return (
    <div className={cn("error-reporter", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Error Reporter</h3>
        {children}
      </div>
    </div>
  );
}
