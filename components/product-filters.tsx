"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories, products } from "@/lib/data";

/* ✅ SAFE UNIQUE BRANDS */
const brands: string[] = Array.from(
  new Set(products.map((p) => p.brand).filter(Boolean))
) as string[];

/* ✅ SAFE UNIQUE SIZES */
const sizes: string[] = Array.from(
  new Set(products.flatMap((p) => p.sizes || []))
);

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState("");

  /* ✅ CURRENT VALUES */
  const currentCategory = searchParams.get("category") ?? "all";
  const currentBrand = searchParams.get("brand") ?? "all";
  const currentGender = searchParams.get("gender") ?? "all";
  const currentSize = searchParams.get("size") ?? "all";
  const currentSearch = searchParams.get("search") ?? "";

  /* ✅ SYNC SEARCH INPUT */
  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  /* ✅ UPDATE URL */
  const updateFilters = (
    category: string = currentCategory,
    brand: string = currentBrand,
    gender: string = currentGender,
    size: string = currentSize,
    search: string = currentSearch
  ) => {
    const params = new URLSearchParams();

    if (category !== "all") params.set("category", category);
    if (brand !== "all") params.set("brand", brand);
    if (gender !== "all") params.set("gender", gender);
    if (size !== "all") params.set("size", size);
    if (search.trim()) params.set("search", search.trim());

    startTransition(() => {
      router.push(`/products${params.toString() ? `?${params}` : ""}`);
    });
  };

  /* ✅ LIVE SEARCH (BETTER UX) */
  useEffect(() => {
    const delay = setTimeout(() => {
      updateFilters(
        currentCategory,
        currentBrand,
        currentGender,
        currentSize,
        searchQuery
      );
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  /* ✅ CLEAR ALL */
  const clearAll = () => {
    setSearchQuery("");
    router.push("/products");
  };

  /* ✅ ACTIVE FILTERS */
  const activeFilters = [
    currentCategory !== "all" && currentCategory,
    currentBrand !== "all" && currentBrand,
    currentGender !== "all" && currentGender,
    currentSize !== "all" && currentSize,
    currentSearch && `"${currentSearch}"`,
  ].filter(Boolean);

  return (
    <div className="mb-10">
      <div className="rounded-2xl border bg-card p-5 shadow-sm">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Filters</h3>
          </div>

          {activeFilters.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-primary hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* SEARCH */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 min-w-[220px] rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* CATEGORY */}
          <Select
            value={currentCategory}
            onValueChange={(value) =>
              updateFilters(value, currentBrand, currentGender, currentSize, searchQuery)
            }
          >
            <SelectTrigger className="h-10 min-w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* BRAND */}
          <Select
            value={currentBrand}
            onValueChange={(value) =>
              updateFilters(currentCategory, value, currentGender, currentSize, searchQuery)
            }
          >
            <SelectTrigger className="h-10 min-w-[150px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* GENDER */}
          <Select
            value={currentGender}
            onValueChange={(value) =>
              updateFilters(currentCategory, currentBrand, value, currentSize, searchQuery)
            }
          >
            <SelectTrigger className="h-10 min-w-[130px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>

          {/* SIZE */}
          <Select
            value={currentSize}
            onValueChange={(value) =>
              updateFilters(currentCategory, currentBrand, currentGender, value, searchQuery)
            }
          >
            <SelectTrigger className="h-10 min-w-[120px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs"
              >
                {filter}
                <X className="h-3 w-3 opacity-70" />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}