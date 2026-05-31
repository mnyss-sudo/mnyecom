import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold text-slate-900">
            Shop<span className="text-brand-600">Next</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-slate-600">
            A modern ecommerce experience built with Next.js 15, Tailwind CSS, and
            Supabase.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/products" className="hover:text-slate-900">
                All products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-slate-900">
                Categories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/auth/login" className="hover:text-slate-900">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="hover:text-slate-900">
                Create account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ShopNext. All rights reserved.
      </div>
    </footer>
  );
}
