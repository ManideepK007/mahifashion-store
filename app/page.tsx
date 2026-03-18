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

  return (
    <div className="flex flex-col">

      {/* HERO SECTION */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">

            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Welcome to {storeInfo.name}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
              Discover Your Style
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore a curated collection of fashion essentials designed for
              comfort, style, and everyday wear.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/about">
                <Button size="lg" variant="outline">
                  Our Story
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* CATEGORIES */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Shop by Category
            </h2>

            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our collections and find the perfect fit for your style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

        </div>
      </section>


      {/* FEATURED PRODUCTS */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">

            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                Featured Products
              </h2>

              <p className="text-muted-foreground">
                Our most popular picks
              </p>
            </div>

            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
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


      {/* NEW ARRIVALS */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">

            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                New Arrivals
              </h2>

              <p className="text-muted-foreground">
                Fresh styles just added
              </p>
            </div>

            <Link href="/products">
              <Button variant="outline">
                View Collection
                <ArrowRight className="ml-2 h-4 w-4" />
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


      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="max-w-2xl mx-auto text-center">

            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Ready to upgrade your wardrobe?
            </h2>

            <p className="text-primary-foreground/80 mb-8 text-lg">
              Browse our latest styles and shop your favorites today.
            </p>

            <Link href="/products">
              <Button size="lg" variant="secondary">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}