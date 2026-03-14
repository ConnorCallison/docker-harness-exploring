import type { Route } from "./+types/settings.billing";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    return { success: true, message: "Item deleted" };
  }
  return { success: true, message: "Action completed" };
}

export default function SettingsBilling() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Settings Billing</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Content goes here</p>
      </div>
    </div>
  );
}
