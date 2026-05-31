import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSessionUser, isAdmin } from "@/lib/auth";
import { siteUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "ShopNext — Modern Ecommerce",
    template: "%s | ShopNext",
  },
  description:
    "Discover curated products across electronics, apparel, and home. Fast checkout, secure auth, and a seamless shopping experience.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ShopNext",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();
  const admin = user ? await isAdmin() : false;

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header isLoggedIn={!!user} isAdmin={admin} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
