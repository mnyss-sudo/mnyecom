import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ShopNext account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="font-medium text-brand-600 hover:text-brand-700">
          Sign up
        </Link>
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </div>
  );
}
