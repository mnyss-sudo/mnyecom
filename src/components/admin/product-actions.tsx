"use client";

import { useState } from "react";
import type { Product } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProductStock } from "@/app/admin/actions";

export function AdminProductActions({ product }: { product: Product }) {
  const [stock, setStock] = useState(String(product.stock));
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    await updateProductStock(product.id, parseInt(stock, 10));
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-20"
      />
      <Button size="sm" variant="secondary" onClick={handleUpdate} disabled={loading}>
        Save
      </Button>
    </div>
  );
}
