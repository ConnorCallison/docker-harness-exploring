import type { Route } from "./+types/orders.$orderId.tracking";
import { DataTable } from "~/components/data/DataTable";
import { FilterBar } from "~/components/data/FilterBar";

export default function OrderTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order Tracking</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Content goes here</p>
      </div>
    </div>
  );
}
