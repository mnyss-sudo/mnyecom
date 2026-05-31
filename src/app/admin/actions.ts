"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/types/database";

export async function updateProductStock(productId: string, stock: number) {
  const supabase = await createClient();
  await supabase.from("products").update({ stock }).eq("id", productId);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
  await supabase.from("orders").update({ status }).eq("id", orderId);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
