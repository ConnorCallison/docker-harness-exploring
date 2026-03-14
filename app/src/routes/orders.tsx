import type { Route } from "./+types/orders";
import { DataTable } from "~/components/data/DataTable";
import { FilterBar } from "~/components/data/FilterBar";

export default function Orders({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Orders</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
