"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingBag as ShoppingBang,
  Heart,
  ShoppingCart,
  Search,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storeInfo } from "@/lib/data";

// ✅ CORRECT IMPORTS: One for each context
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* 🛍 Logo: Mahi Fashions Vibe */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center bg-primary p-2 rounded-sm transition-transform group-hover:-rotate-3">
              <Image
                src="/logo.png"
                alt="{`${storeInfo.name} Logo`"
                fill
                className="object-contain transition-transform group-hover:scale-110"
                priority
              />
            </div>
            <span className="font-serif text-xl font-bold tracking-tighter uppercase italic hidden sm:block">
              {storeInfo.name}
            </span>
            <ShoppingBag className="h-6 w-6 text-primary transition-transform group-hover:-rotate-12" />
            <span className="font-serif text-xl font-bold tracking-tighter uppercase italic">
              {storeInfo.name}
            </span>
          </Link>

          {/* 📌 Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-xs uppercase tracking-widest font-bold transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full bg-primary transition-transform origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* 🔍 + ❤️ + 🛒 Actions */}
          <div className="hidden md:flex items-center gap-5">

            {/* 🔍 Search bar with subtle style */}
            <div className="relative w-40 lg:w-56 transition-all focus-within:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Find your vibe..."
                className="pl-9 bg-muted/50 border-none h-9 text-xs focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* ❤️ Wishlist with Mounted Fix */}
            <Link href="/wishlist" className="relative group">
              <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-zinc-950 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-none border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* 🛒 Cart with Mounted Fix */}
            <Link href="/cart" className="relative group">
              <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-none border border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <ThemeToggle />

          </div>

          {/* 📱 Mobile Toggle */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 hover:bg-muted"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* 📱 Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen py-6 border-t" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-bold uppercase tracking-tighter ${
                  pathname === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-[1px] bg-border w-full" />

            <div className="flex items-center justify-between">
              <Link href="/cart" className="flex items-center gap-3 font-medium">
                <ShoppingCart className="h-5 w-5" />
                Cart ({mounted ? totalItems : 0})
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3 font-medium">
                <Heart className="h-5 w-5" />
                Wishlist ({mounted ? wishlist.length : 0})
              </Link>
            </div>

            <Link href="/products">
              <Button className="w-full h-12 text-base font-bold uppercase tracking-widest">
                Explore the Drop
              </Button>
            </Link>
          </div>
        </div>

      </nav>
    </header>
  );
}