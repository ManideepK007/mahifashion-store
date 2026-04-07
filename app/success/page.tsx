"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">

      <h1 className="text-3xl font-semibold mb-4">
        🎉 Order Placed!
      </h1>

      <p className="mb-6">
        Your order has been successfully placed.
      </p>

      <Link href="/orders">
        <Button>View Orders</Button>
      </Link>

    </div>
  );
}