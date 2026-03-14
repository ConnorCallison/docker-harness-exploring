import type { Route } from "./+types/reports";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    return { success: true, message: "Item deleted" };
  }
  return { success: true, message: "Action completed" };
}

export default function Reports({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Reports</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
