import { cn } from "~/lib/cn";

interface ABTestWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

export function ABTestWrapper({ className, children }: ABTestWrapperProps) {
  return (
    <div className={cn("a-b-test-wrapper", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">A B Test Wrapper</h3>
        {children}
      </div>
    </div>
  );
}
