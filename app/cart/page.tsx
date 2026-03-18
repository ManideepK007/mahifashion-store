"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: string) => {
    setLoadingId(id);
    removeFromCart(id);
    setTimeout(() => setLoadingId(null), 300);
  };

  const handleQtyChange = (id: string, type: "inc" | "dec") => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newQty =
      type === "inc" ? item.quantity + 1 : item.quantity - 1;

    if (newQty < 1) return;

    updateQuantity(id, newQty);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold mb-6">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Your cart is empty
          </p>

          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {/* 🛍 LEFT: ITEMS */}
          <div className="md:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="
                  flex gap-4 p-4 rounded-xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  shadow-sm hover:shadow-md
                  transition
                "
              >

                {/* Image */}
                <div className="relative w-24 h-28 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">

                  <h3 className="font-medium">
                    {item.name}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatPrice(item.price)}
                  </p>

                  {/* 🔢 Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">

                    <button
                      onClick={() => handleQtyChange(item.id, "dec")}
                      className="
                        px-2 py-1 border rounded
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        transition
                      "
                    >
                      −
                    </button>

                    <span className="min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleQtyChange(item.id, "inc")}
                      className="
                        px-2 py-1 border rounded
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        transition
                      "
                    >
                      +
                    </button>

                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-3">
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={loadingId === item.id}
                      className="
                        text-sm text-red-500
                        hover:underline
                        disabled:opacity-50
                      "
                    >
                      {loadingId === item.id ? "Removing..." : "Remove"}
                    </button>
                  </div>

                </div>

                {/* Price */}
                <div className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </div>

              </div>
            ))}

          </div>

          {/* 💰 RIGHT: SUMMARY */}
          <div
            className="
              p-6 rounded-xl border
              border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-900
              shadow-sm h-fit sticky top-20
            "
          >

            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

            </div>

            <Button
              className="
                w-full mt-4
                hover:scale-[1.02]
                active:scale-[0.97]
                transition
              "
            >
              Proceed to Checkout
            </Button>

          </div>

        </div>
      )}
    </div>
  );
}