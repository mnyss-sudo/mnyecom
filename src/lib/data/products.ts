import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Category, Product } from "@/types/database";
import { demoCategories, demoProducts } from "@/lib/data/demo";

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return demoCategories;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error || !data) return demoCategories;
  return data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return demoCategories.find((c) => c.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).single();
  return data;
}

export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let items = [...demoProducts];
    if (options?.categorySlug) {
      const cat = demoCategories.find((c) => c.slug === options.categorySlug);
      items = items.filter((p) => p.category_id === cat?.id);
    }
    if (options?.featured) items = items.filter((p) => p.featured);
    if (options?.limit) items = items.slice(0, options.limit);
    return items;
  }

  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (options?.featured) query = query.eq("featured", true);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error || !data) return demoProducts;

  if (options?.categorySlug) {
    return data.filter(
      (p) =>
        (p.categories as Category | null)?.slug === options.categorySlug ||
        demoCategories.find((c) => c.id === p.category_id)?.slug === options.categorySlug,
    );
  }

  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return demoProducts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("slug", slug)
    .single();

  return data;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}
