import type { Route } from "./+types/_index";

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

export default function Home({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Home</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
