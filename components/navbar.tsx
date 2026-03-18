"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, ShoppingCart } from "lucide-react";

import { ThemeToggle} from "@/components/theme-toggle";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import { Button } from "@/components/ui/button";
import { storeInfo } from "@/lib/data";

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
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* 🛍 Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-semibold">
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
                  className={`group relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full bg-primary transition-transform ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ❤️ + 🛒 Actions */}
          <div className="hidden md:flex items-center gap-5">

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <Heart className="h-5 w-5 hover:text-red-500 transition" />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 hover:text-primary transition" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>

          {/* 📱 Mobile Toggle */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 hover:bg-muted"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>

        {/* 📱 Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 py-4 border-t" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">

            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium ${
                    isActive
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* 🛒 Cart (Mobile) */}
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart ({totalItems})
            </Link>

            {/* ❤️ Wishlist (Mobile) */}
            <Link href="/wishlist" className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Wishlist ({wishlist.length})
            </Link>

            <Link href="/products">
              <Button className="w-full">
                Browse Products
              </Button>
            </Link>

          </div>
        </div>

      </nav>
    </header>
  );
}