import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/products/product-grid";
import { CategoryCard } from "@/components/categories/category-card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getCategories(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            New season
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Curated goods for modern living
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            Premium products, fast delivery, and a checkout experience you will love.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg">
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Browse categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Shop by category</h2>
            <p className="mt-1 text-slate-600">Find exactly what you are looking for</p>
          </div>
          <Link href="/categories" className="hidden text-sm font-medium text-brand-600 hover:text-brand-700 sm:block">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Featured products</h2>
              <p className="mt-1 text-slate-600">Hand-picked favorites this week</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>
    </>
  );
}
