import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

export const metadata: Metadata = {
  title: "Admin — Orders",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, customers(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Orders</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {!orders?.length ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const customer = order.customers as {
                    full_name?: string;
                    email?: string;
                  } | null;
                  return (
                    <tr key={order.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-mono text-xs">{order.order_number}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{customer?.full_name ?? "—"}</p>
                        <p className="text-xs text-slate-500">{customer?.email}</p>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {formatPrice(Number(order.total))}
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusSelect
                          orderId={String(order.id)}
                          status={order.order_status}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
