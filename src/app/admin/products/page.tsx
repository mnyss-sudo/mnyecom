import type { Metadata } from "next";
import Image from "next/image";
import { getProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { AdminProductActions } from "@/components/admin/product-actions";

export const metadata: Metadata = {
  title: "Admin — Products",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Products</h2>
        <p className="text-sm text-slate-500">{products.length} total</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-slate-100">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <AdminProductActions product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
