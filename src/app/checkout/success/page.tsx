import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ order?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-6 text-3xl font-bold text-slate-900">Thank you!</h1>
      <p className="mt-2 text-slate-600">Your order has been placed successfully.</p>
      {order && (
        <p className="mt-2 text-sm text-slate-500">
          Order ID: <span className="font-mono">{order}</span>
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products">
          <Button>Continue shopping</Button>
        </Link>
        <Link href="/account">
          <Button variant="secondary">View account</Button>
        </Link>
      </div>
    </div>
  );
}
