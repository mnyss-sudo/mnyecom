"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useCartStore, cartCount } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
];

type HeaderProps = {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
};

export function Header({ isAdmin = false, isLoggedIn = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = cartCount(items);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Shop<span className="text-brand-600">Next</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:flex"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          )}
          <Link
            href={isLoggedIn ? "/account" : "/auth/login"}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label={isLoggedIn ? "Account" : "Sign in"}
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-slate-100 bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              Admin dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
