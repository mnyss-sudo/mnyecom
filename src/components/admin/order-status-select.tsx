"use client";

import { useState } from "react";
import type { OrderStatus } from "@/types/database";
import { updateOrderStatus } from "@/app/admin/actions";

const statuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function handleChange(next: OrderStatus) {
    setValue(next);
    setLoading(true);
    await updateOrderStatus(orderId, next);
    setLoading(false);
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm capitalize"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
