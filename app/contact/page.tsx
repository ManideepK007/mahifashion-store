import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { storeInfo } from "@/lib/data";

export const metadata = {
  title: "Contact Us | LocalStore",
  description:
    "Contact LocalStore. Find our store location, call us, or message us on WhatsApp to place an order quickly.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: storeInfo.address,
    description: "Come see our products in person",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: storeInfo.phone,
    description: "We're happy to help",
    href: `tel:${storeInfo.phone}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    content: storeInfo.email,
    description: "For inquiries and support",
    href: `mailto:${storeInfo.email}`,
  },
  {
    icon: Clock,
    title: "Store Hours",
    content: storeInfo.hours,
    description: "Visit us during these times",
  },
];

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like to place an order."
  )}`;

  return (
    <div className="flex flex-col">

      {/* HEADER */}

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Contact Us
            </p>

            <h1 className="mb-4 font-serif text-4xl md:text-5xl font-semibold text-foreground">
              We'd love to hear from you
            </h1>

            <p className="leading-relaxed text-muted-foreground">
              Have questions about our products or need help placing an order?
              Reach out to us through any of the channels below.
            </p>

          </div>

        </div>
      </section>

      {/* WHATSAPP CTA */}

      <section className="pb-14">
        <div className="container mx-auto px-6 lg:px-12">

          <Card className="mx-auto max-w-xl border-[#25D366]/30 bg-[#25D366]/10">

            <CardContent className="p-8 text-center">

              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-[#25D366]" />

              <h2 className="mb-2 font-serif text-2xl font-semibold">
                Order via WhatsApp
              </h2>

              <p className="mb-6 text-muted-foreground">
                The fastest way to place an order. Send us a message and we will assist you immediately.
              </p>

              <Button
                asChild
                className="bg-[#25D366] text-white hover:bg-[#128C7E]"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>

            </CardContent>

          </Card>

        </div>
      </section>

      {/* CONTACT CARDS */}

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {contactInfo.map((item) => (
              <Card
                key={item.title}
                className="h-full hover:shadow-md transition-shadow"
              >

                <CardContent className="p-6">

                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="mb-1 font-semibold">
                    {item.title}
                  </h3>

                  <p className="mb-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">
                      {item.content}
                    </p>
                  )}

                </CardContent>

              </Card>
            ))}

          </div>

        </div>
      </section>

      {/* MAP */}

      <section className="bg-card py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="mb-8 text-center">

            <h2 className="mb-2 font-serif text-2xl md:text-3xl font-semibold">
              Find Our Store
            </h2>

            <p className="text-muted-foreground">
              Visit us and explore our latest collection
            </p>

          </div>

          <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border">

            <iframe
              src="https://www.google.com/maps?q=Hyderabad&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Store Location"
            />

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="mx-auto max-w-xl text-center">

            <h2 className="mb-4 font-serif text-3xl md:text-4xl font-semibold">
              Ready to shop?
            </h2>

            <p className="mb-8 text-muted-foreground">
              Browse our catalog and discover our latest fashion collection.
            </p>

            <Button asChild size="lg">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </div>

        </div>
      </section>

    </div>
  );
}