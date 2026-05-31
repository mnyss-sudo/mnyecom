import type { Metadata } from "next";
import { getProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/products/product-grid";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full catalog of curated products.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">All products</h1>
        <p className="mt-2 text-slate-600">{products.length} items available</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
