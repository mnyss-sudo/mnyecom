import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order securely.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout</h1>
      <p className="mt-2 text-slate-600">Enter shipping details to place your order</p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
