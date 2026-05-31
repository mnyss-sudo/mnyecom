import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Category, Product } from "@/types/database";
import { mapCategory, mapProduct } from "@/lib/data/mappers";
import { demoCategories, demoProducts } from "@/lib/data/demo";

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return demoCategories;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error || !data?.length) {
    const products = await getProducts();
    const seen = new Map<string, Category>();
    for (const product of products) {
      if (!seen.has(product.category_slug)) {
        seen.set(product.category_slug, {
          id: product.category_slug,
          name: product.category,
          slug: product.category_slug,
          description: null,
          image_url: null,
          created_at: product.created_at,
        });
      }
    }
    return Array.from(seen.values());
  }

  return data.map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let items = [...demoProducts];
    if (options?.categorySlug) {
      items = items.filter((p) => p.category_slug === options.categorySlug);
    }
    if (options?.featured) items = items.filter((p) => p.featured);
    if (options?.limit) items = items.slice(0, options.limit);
    return items;
  }

  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (options?.featured) query = query.eq("featured", true);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error || !data) return [];

  let products = data.map(mapProduct);

  if (options?.categorySlug) {
    products = products.filter((p) => p.category_slug === options.categorySlug);
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return demoProducts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  return data ? mapProduct(data) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}
