"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function SizeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the currently selected size from the URL (e.g., ?size=L)
  const currentSize = searchParams.get("size") || "";

  const handleSizeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set("size", value);
    } else {
      params.delete("size"); // Deselecting removes the filter
    }
    
    // Update the URL without a full page reload
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Select Size
      </h3>
      <ToggleGroup 
        type="single" 
        value={currentSize} 
        onValueChange={handleSizeChange}
        className="justify-start gap-2 flex-wrap"
      >
        {SIZES.map((size) => (
          <ToggleGroupItem
            key={size}
            value={size}
            className="h-10 w-12 border border-zinc-200 data-[state=on]:bg-black data-[state=on]:text-white transition-all uppercase font-bold"
          >
            {size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      
      {/* 💡 THE "DISPLAYED ONLY AFTER SELECTING" FEATURE */}
      {currentSize && (
        <div className="mt-4 p-3 bg-zinc-100 rounded-sm animate-in fade-in slide-in-from-top-1">
          <p className="text-xs text-zinc-600">
            Filtering by: <span className="font-bold text-black">{currentSize}</span>
          </p>
          <button 
            onClick={() => handleSizeChange("")}
            className="text-[10px] underline uppercase mt-1 hover:text-red-500"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}