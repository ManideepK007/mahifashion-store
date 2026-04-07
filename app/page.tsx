"use client";

import { useState } from "react"; // Added for image fallback
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import {
  getFeaturedProducts,
  categories,
  products,
  storeInfo,
} from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = products.slice(-4);

  // INDUSTRY STANDARD: State to handle broken images
  const [heroSrc, setHeroSrc] = useState("/hero.jpg");

  return (
    <div className="flex flex-col">

      {/* 🔥 HERO SECTION (UPGRADED TO OOKOKAKA) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-900">

        {/* Background Image with Fallback */}
        <Image
          src={heroSrc} 
          alt="OokoKaka Streetwear Banner"
          fill
          priority
          className="object-cover"
          // If /public/hero.jpg is missing, it swaps to a high-quality placeholder
          onError={() => setHeroSrc("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop")}
        />

        {/* Overlay - Darkened for better text readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">

          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to {storeInfo.name}
          </p>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6 italic uppercase">
            Streetwear with Attitude
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Minimal. Modern. Bold. Discover the latest drops from OokoKaka designed for the urban rebel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="cursor-pointer">
              <Button size="lg" className="cursor-pointer text-base px-8 py-6 bg-white text-black hover:bg-zinc-200 border-none">
                Shop the Drop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/about" className="cursor-pointer">
              <Button size="lg" variant="outline" className="cursor-pointer bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 px-8 py-6">
                Our Story
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 🧩 CATEGORIES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Find exactly what matches your vibe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ FEATURED */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-2">
                Handpicked favorites from the collective
              </p>
            </div>

            <Link href="/products">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 🆕 NEW ARRIVALS */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                New Arrivals
              </h2>
              <p className="text-muted-foreground mt-2">
                Just dropped 🔥
              </p>
            </div>

            <Link href="/products">
              <Button variant="ghost" className="group">
                Explore
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="py-32 bg-black text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter italic">
            UPGRADE YOUR WARDROBE
          </h2>
          <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto uppercase tracking-widest">
            Style that speaks. Quality that lasts.
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-base px-12 py-7 font-bold uppercase tracking-wider">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}