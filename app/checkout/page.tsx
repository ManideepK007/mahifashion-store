"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  // 🔐 Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking login...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">Your cart is empty 🛒</p>
        <Button onClick={() => router.push("/products")}>
          Go Shopping
        </Button>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      address,
      status: "Processing",
      date: new Date().toISOString(),
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));

    clearCart(); // ✅ important
    router.push("/success");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">

      <h1 className="text-2xl font-semibold mb-6">
        Checkout
      </h1>

      {/* USER */}
      {user && (
        <p className="text-sm mb-4">
          Logged in as: {user.displayName}
        </p>
      )}

      {/* ADDRESS */}
      <div className="mb-6">
        <h2 className="font-medium mb-2">Delivery Address</h2>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full address..."
          className="w-full border p-3 rounded-md"
        />
      </div>

      {/* SUMMARY */}
      <div className="border p-6 rounded-xl">

        <h2 className="font-semibold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-1">
            <span>{item.name}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <Button
          className="w-full mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order 🚀
        </Button>

      </div>
    </div>
  );
}