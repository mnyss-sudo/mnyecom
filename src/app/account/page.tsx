import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/account/actions";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?redirect=/account");

  const admin = await isAdmin();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("email", user.email ?? "")
    .maybeSingle();

  const { data: orders } = customer
    ? await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
        .limit(10)
    : { data: [] };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My account</h1>
          <p className="mt-1 text-slate-600">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Order history</h2>
        {!orders?.length ? (
          <p className="mt-4 text-slate-500">No orders yet for this email.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{order.order_number}</p>
                  <p className="text-sm text-slate-600">{order.order_status}</p>
                </div>
                <p className="font-semibold">{formatPrice(Number(order.total))}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {admin && (
        <Link href="/admin" className="mt-8 inline-block">
          <Button variant="secondary">Go to admin dashboard</Button>
        </Link>
      )}
    </div>
  );
}
