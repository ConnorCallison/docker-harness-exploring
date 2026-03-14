import { cn } from "~/lib/cn";

interface SupportTicketListProps {
  className?: string;
  children?: React.ReactNode;
}

export function SupportTicketList({ className, children }: SupportTicketListProps) {
  return (
    <div className={cn("support-ticket-list", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Support Ticket List</h3>
        {children}
      </div>
    </div>
  );
}
