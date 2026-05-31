import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/database";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl"
    >
      {category.image_url && (
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
        {category.description && (
          <p className="mt-1 text-sm text-white/80 line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
