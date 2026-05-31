import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
        )}
        {product.compare_at_price && product.compare_at_price > product.price && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 font-semibold text-slate-900 group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
