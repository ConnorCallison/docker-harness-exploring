import type { Route } from "./+types/users.$userId.edit";
import { DataTable } from "~/components/data/DataTable";
import { FilterBar } from "~/components/data/FilterBar";

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

export default function UserEdit({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Edit</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      </div>
    </div>
  );
}
