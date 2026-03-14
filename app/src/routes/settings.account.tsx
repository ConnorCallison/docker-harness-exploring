import type { Route } from "./+types/settings.account";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  // Simulated data fetching
  return {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: `item-${(page - 1) * 20 + i + 1}`,
      name: `Item ${(page - 1) * 20 + i + 1}`,
      status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "inactive",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    })),
    total: 100,
    page,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    return { success: true, message: "Item deleted" };
  }
  return { success: true, message: "Action completed" };
}

export default function SettingsAccount({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Settings Account</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      </div>
    </div>
  );
}
