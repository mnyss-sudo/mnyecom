"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProductStock(productId: string, stock: number) {
  const supabase = await createClient();
  await supabase.from("products").update({ stock }).eq("id", Number(productId));
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();
  await supabase.from("orders").update({ order_status: status }).eq("id", Number(orderId));
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
