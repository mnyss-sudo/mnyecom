import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingCart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Overview",
  robots: { index: false, follow: false },
};

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const products = await getProducts();

  const [{ count: orderCount }, { count: customerCount }, { data: recentOrders }] =
    await Promise.all([
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("customers").select("*", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("*, customers(full_name, email)")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const stats = [
    { label: "Products", value: products.length, icon: Package },
    { label: "Orders", value: orderCount ?? 0, icon: ShoppingCart },
    { label: "Customers", value: customerCount ?? 0, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">{stat.label}</p>
              <stat.icon className="h-5 w-5 text-brand-600" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Recent orders</h2>
        {!recentOrders?.length ? (
          <p className="mt-4 text-sm text-slate-500">No orders yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-2 pr-4 font-medium">Order</th>
                  <th className="pb-2 pr-4 font-medium">Customer</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const customer = order.customers as {
                    full_name?: string;
                    email?: string;
                  } | null;
                  return (
                    <tr key={order.id} className="border-b border-slate-50">
                      <td className="py-3 pr-4 font-mono text-xs">{order.order_number}</td>
                      <td className="py-3 pr-4">
                        {customer?.full_name ?? "—"}
                        <span className="block text-xs text-slate-500">
                          {customer?.email}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{order.order_status}</td>
                      <td className="py-3 font-medium">
                        {formatPrice(Number(order.total))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
