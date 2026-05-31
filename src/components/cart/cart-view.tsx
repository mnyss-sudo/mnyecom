"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, cartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartView() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
        <p className="text-slate-600">Your cart is empty</p>
        <Link href="/products" className="mt-4 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <ul className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              {item.imageUrl && (
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-slate-900 hover:text-brand-700"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-slate-500">{formatPrice(item.price)} each</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-red-600"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="h-fit rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Subtotal</dt>
            <dd className="font-medium">{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Shipping</dt>
            <dd className="font-medium text-green-600">Free</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">{formatPrice(total)}</span>
        </div>
        <Link href="/checkout" className="mt-6 block">
          <Button size="lg" className="w-full">
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
