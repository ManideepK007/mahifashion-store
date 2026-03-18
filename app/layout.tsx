import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrderProvider } from "@/context/OrderContext"; // ✅ ADD THIS

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "LocalStore - Your Neighborhood Shop Online",
  description:
    "Browse and shop from your favorite local store. Quality products, friendly service, delivered to your doorstep.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#f5f3f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} ${playfair.variable}
          font-sans antialiased
          bg-zinc-50 text-zinc-900
          dark:bg-zinc-950 dark:text-zinc-100
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {/* ✅ FIX: Add OrderProvider */}
          <OrderProvider>

            <WishlistProvider>
              <CartProvider>

                <Suspense fallback={<div className="h-16 bg-background" />}>
                  <Navbar />
                </Suspense>

                <main className="min-h-screen">
                  {children}
                </main>

                <Footer />

              </CartProvider>
            </WishlistProvider>

          </OrderProvider>

        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}