import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/products/product-grid";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description ?? `Shop ${category.name} at ShopNext.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProducts({ categorySlug: slug });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-2xl text-slate-600">{category.description}</p>
        )}
        <p className="mt-2 text-sm text-slate-500">{products.length} products</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
