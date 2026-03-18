import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { storeInfo } from "@/lib/data";

export const metadata = {
  title: "About Us - LocalStore",
  description: "Learn about our story, our mission, and our commitment to serving our community with quality products.",
};

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We carefully select every product to ensure it meets our high standards.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Supporting local suppliers and serving our neighborhood with pride.",
  },
  {
    icon: Award,
    title: "Trusted Service",
    description: "Building relationships through honest, friendly customer service.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Open when you need us, with convenient ordering options.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
              More than just a store
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {storeInfo.name} has been serving our community with quality products and exceptional service. We believe in building lasting relationships with our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Store Images */}
      <section className="py-8 lg:py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=450&fit=crop"
                alt="Store interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=450&fit=crop"
                alt="Products display"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=450&fit=crop"
                alt="Customer service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Owner Message */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Store owner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  A Message from Our Founder
                </h2>
                <blockquote className="text-muted-foreground leading-relaxed italic">
                  &ldquo;When I opened {storeInfo.name}, my vision was simple: create a place where neighbors could find quality products at fair prices, backed by genuine service. Every day, we strive to be more than just a store - we aim to be a trusted part of your daily life. Thank you for being part of our journey.&rdquo;
                </blockquote>
                <p className="mt-4 font-medium text-foreground">
                  — James Mitchell, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Visit us today
            </h2>
            <p className="text-muted-foreground mb-8">
              Come see our products in person or browse online and order via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
