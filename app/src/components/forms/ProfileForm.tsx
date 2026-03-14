import { cn } from "~/lib/cn";

interface ProfileFormProps {
  className?: string;
  children?: React.ReactNode;
}

export function ProfileForm({ className, children }: ProfileFormProps) {
  return (
    <div className={cn("profile-form", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Profile Form</h3>
        {children}
      </div>
    </div>
  );
}
