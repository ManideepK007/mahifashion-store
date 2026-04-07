import Link from "next/link";
import { ShoppingBag, Facebook, Instagram, Twitter } from "lucide-react";
import { storeInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              <span className="font-serif text-xl font-semibold">
                {storeInfo.name}
              </span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              {storeInfo.tagline}. Quality products and exceptional service for our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>{storeInfo.phone}</li>
              <li>{storeInfo.email}</li>
              <li className="leading-relaxed">{storeInfo.address}</li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Store Hours
            </h3>
            <p className="text-sm text-background/70 mb-6">{storeInfo.hours}</p>
            <div className="flex gap-4">
              <a
                href={storeInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={storeInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={storeInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <p className="text-center text-sm text-background/50">
            &copy; {new Date().getFullYear()} {storeInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
