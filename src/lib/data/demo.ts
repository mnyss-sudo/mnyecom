import type { Category, Product } from "@/types/database";

const now = new Date().toISOString();

export const demoCategories: Category[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Headphones, speakers, and smart gear.",
    image_url:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    created_at: now,
  },
  {
    id: "cat-apparel",
    name: "Apparel",
    slug: "apparel",
    description: "Modern essentials for everyday wear.",
    image_url:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    created_at: now,
  },
  {
    id: "cat-home",
    name: "Home",
    slug: "home",
    description: "Elevate your living space.",
    image_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    created_at: now,
  },
];

export const demoProducts: Product[] = [
  {
    id: "prod-1",
    name: "Aurora Wireless Headphones",
    slug: "aurora-wireless-headphones",
    description:
      "Premium noise-cancelling headphones with 40-hour battery life and studio-quality sound.",
    price: 249.99,
    compare_at_price: 299.99,
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category_id: "cat-electronics",
    stock: 42,
    featured: true,
    created_at: now,
    categories: demoCategories[0],
  },
  {
    id: "prod-2",
    name: "Nimbus Smart Speaker",
    slug: "nimbus-smart-speaker",
    description: "Room-filling sound with voice assistant and multi-room sync.",
    price: 129.0,
    compare_at_price: null,
    image_url:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    category_id: "cat-electronics",
    stock: 28,
    featured: true,
    created_at: now,
    categories: demoCategories[0],
  },
  {
    id: "prod-3",
    name: "Linen Blend Overshirt",
    slug: "linen-blend-overshirt",
    description: "Relaxed fit overshirt in breathable linen-cotton blend.",
    price: 89.0,
    compare_at_price: 110.0,
    image_url:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    category_id: "cat-apparel",
    stock: 65,
    featured: true,
    created_at: now,
    categories: demoCategories[1],
  },
  {
    id: "prod-4",
    name: "Merino Crew Sweater",
    slug: "merino-crew-sweater",
    description: "Ultra-soft merino wool sweater for all-season comfort.",
    price: 118.0,
    compare_at_price: null,
    image_url:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    category_id: "cat-apparel",
    stock: 33,
    featured: false,
    created_at: now,
    categories: demoCategories[1],
  },
  {
    id: "prod-5",
    name: "Ceramic Table Lamp",
    slug: "ceramic-table-lamp",
    description: "Hand-glazed ceramic base with warm dimmable LED bulb.",
    price: 74.5,
    compare_at_price: null,
    image_url:
      "https://images.unsplash.com/photo-1507473885762-e6ed057f782c?w=800&q=80",
    category_id: "cat-home",
    stock: 19,
    featured: true,
    created_at: now,
    categories: demoCategories[2],
  },
  {
    id: "prod-6",
    name: "Wool Throw Blanket",
    slug: "wool-throw-blanket",
    description: "Chunky knit wool throw — cozy, sustainable, and machine washable.",
    price: 95.0,
    compare_at_price: 120.0,
    image_url:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    category_id: "cat-home",
    stock: 24,
    featured: false,
    created_at: now,
    categories: demoCategories[2],
  },
];
