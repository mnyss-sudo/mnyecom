import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your ShopNext account.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
      <p className="mt-2 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </div>
  );
}
