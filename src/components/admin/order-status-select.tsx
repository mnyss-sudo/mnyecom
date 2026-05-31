"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/admin/actions";

const statuses = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function handleChange(next: string) {
    setValue(next);
    setLoading(true);
    await updateOrderStatus(orderId, next);
    setLoading(false);
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm"
    >
      {[...new Set([...statuses, value])].map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
