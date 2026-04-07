"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db"; 
// import { auth } from "@/lib/auth"; // Assuming you'll add NextAuth/Auth.js

export async function addToCartAction(productId: string, size: string) {
  try {
    // 1. Authenticate the User (Industry Standard)
    // const session = await auth();
    // if (!session) throw new Error("Please login to shop.");

    // 2. Real-time Inventory Check
    const product = await db.product.findUnique({ 
      where: { id: productId },
      select: { id: true, stock: true, name: true } 
    });

    if (!product || product.stock <= 0) {
      return { success: false, message: `${product?.name || 'Item'} is currently sold out.` };
    }

    // 3. Logic: Create or Update Cart Item
    // This is "Real-Time" because it hits PostgreSQL directly
    await db.cartItem.upsert({
      where: { 
        // Unique constraint: same user + same product + same size
        userId_productId_size: { 
          userId: "user_123", // Replace with session.user.id
          productId, 
          size 
        } 
      },
      update: { quantity: { increment: 1 } },
      create: { 
        userId: "user_123", 
        productId, 
        size, 
        quantity: 1 
      },
    });

    // 4. THE MAGIC: Revalidate the cache
    // This forces Next.js to fetch fresh data for these routes
    revalidatePath("/products"); 
    revalidatePath("/cart");
    revalidatePath(`/products/${productId}`);

    return { success: true, message: "Added to your OokoKaka collection!" };

  } catch (error) {
    console.error("Cart Action Error:", error);
    return { success: false, message: "Something went wrong. Try again." };
  }
}