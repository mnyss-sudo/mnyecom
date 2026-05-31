"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, cartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeOrder } from "@/app/checkout/actions";
import Link from "next/link";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const total = cartTotal(items);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-slate-600">Your cart is empty</p>
        <Link href="/products" className="mt-4 inline-block">
          <Button>Shop products</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await placeOrder(formData, items);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    clearCart();
    router.push(`/checkout/success?order=${result.orderId}`);
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Shipping information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" required autoComplete="street-address" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required autoComplete="address-level2" />
          </div>
          <div>
            <Label htmlFor="postal">Postal code</Label>
            <Input id="postal" name="postal" required autoComplete="postal-code" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" defaultValue="United States" required />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Order total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {items.length} item{items.length !== 1 ? "s" : ""} · Demo checkout (no payment processor)
        </p>
      </section>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Placing order…" : "Place order"}
      </Button>
    </form>
  );
}
