import type { Category, Product } from "@/types/database";

const now = new Date().toISOString();

export const demoCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Headphones, speakers, and smart gear.",
    image_url:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    created_at: now,
  },
];

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "Aurora Wireless Headphones",
    slug: "aurora-wireless-headphones",
    description: "Premium noise-cancelling headphones.",
    price: 24999,
    compare_at_price: 29999,
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
    category_slug: "electronics",
    brand: "Aurora",
    stock: 42,
    featured: true,
    active: true,
    created_at: now,
  },
];
