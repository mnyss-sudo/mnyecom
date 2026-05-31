"use client";

import { useState } from "react";
import type { Product } from "@/types/database";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto"
      onClick={handleAdd}
      disabled={product.stock < 1}
    >
      {product.stock < 1 ? (
        "Out of stock"
      ) : added ? (
        <>
          <Check className="h-4 w-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </>
      )}
    </Button>
  );
}
