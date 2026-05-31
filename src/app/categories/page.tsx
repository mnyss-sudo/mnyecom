import type { Metadata } from "next";
import { getCategories } from "@/lib/data/products";
import { CategoryCard } from "@/components/categories/category-card";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore products by category.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Categories</h1>
        <p className="mt-2 text-slate-600">Browse our collections</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
