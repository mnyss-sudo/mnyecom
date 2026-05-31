import type { Category, Product } from "@/types/database";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined) return 0;
  return typeof value === "number" ? value : Number(value);
}

type DbProduct = {
  id: number | string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  brand?: string | null;
  price: number | string;
  compare_at_price?: number | string | null;
  stock?: number | null;
  image_url?: string | null;
  featured?: boolean | null;
  active?: boolean | null;
  created_at: string;
};

type DbCategory = {
  id: number | string;
  name: string;
  slug: string;
  image_url?: string | null;
  created_at: string;
};

export function mapProduct(row: DbProduct): Product {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: toNumber(row.price),
    compare_at_price:
      row.compare_at_price != null ? toNumber(row.compare_at_price) : null,
    image_url: row.image_url ?? null,
    category: row.category,
    category_slug: slugify(row.category),
    brand: row.brand ?? null,
    stock: row.stock ?? 0,
    featured: row.featured ?? false,
    active: row.active ?? true,
    created_at: row.created_at,
  };
}

export function mapCategory(row: DbCategory): Category {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    description: null,
    image_url: row.image_url ?? null,
    created_at: row.created_at,
  };
}
