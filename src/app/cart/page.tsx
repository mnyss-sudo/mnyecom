import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review items in your cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your cart</h1>
      <p className="mt-2 text-slate-600">Review your items before checkout</p>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
