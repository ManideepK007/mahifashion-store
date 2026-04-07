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
import { OrderProvider } from "@/context/OrderContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ✅ UPDATED BRANDING: OokoKaka
export const metadata: Metadata = {
  title: "OokoKaka | Streetwear with Attitude",
  description:
    "Explore the latest urban drops. Minimal, modern, and bold streetwear designed for the urban rebel. High-quality fashion delivered to your doorstep.",
  generator: "Next.js", // Cleaned up for portfolio
};

// ✅ UPDATED THEME COLOR: Darker, streetwear-aligned tone
export const viewport: Viewport = {
  themeColor: "#09090b", // Zinc-950 (Black/Dark Grey)
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
          bg-white text-zinc-950
          dark:bg-zinc-950 dark:text-zinc-50
        `}
        // ✅ FIX: Added to ignore browser extension attribute injections
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <OrderProvider>
            <WishlistProvider>
              <CartProvider>
                
                {/* Navbar with subtle background fallback while loading */}
                <Suspense fallback={<div className="h-16 bg-background/50 backdrop-blur-md" />}>
                  <Navbar />
                </Suspense>

                {/* Main Content Area */}
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