import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/lib/data/products";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { formatPrice, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description ?? `Buy ${product.name} at ShopNext.`,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image_url,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${siteUrl()}/products/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/products" className="hover:text-slate-900">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${product.category_slug}`}
          className="hover:text-slate-900"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-sm text-slate-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
