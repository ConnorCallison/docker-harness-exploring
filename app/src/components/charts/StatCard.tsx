import { cn } from "~/lib/cn";
import { ResponsiveContainer } from "recharts";

interface StatCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({ className, children }: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Stat Card</h3>
        {children}
      </div>
    </div>
  );
}
