import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories } from "@/lib/data/products";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [slugs, categories] = await Promise.all([
    getAllProductSlugs(),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/categories`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/categories/${cat.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
