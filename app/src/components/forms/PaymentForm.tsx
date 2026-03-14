import { cn } from "~/lib/cn";

interface PaymentFormProps {
  className?: string;
  children?: React.ReactNode;
}

export function PaymentForm({ className, children }: PaymentFormProps) {
  return (
    <div className={cn("payment-form", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Payment Form</h3>
        {children}
      </div>
    </div>
  );
}
