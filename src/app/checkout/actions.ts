"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { CartItem } from "@/types/database";

function orderTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export async function placeOrder(
  formData: FormData,
  items: CartItem[],
): Promise<{ orderId?: string; error?: string }> {
  if (items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const postal = String(formData.get("postal") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();

  if (!name || !email || !address || !city || !postal || !country) {
    return { error: "Please fill in all shipping fields." };
  }

  const total = orderTotal(items);

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase is not configured. Copy .env.example to .env.local and add your project keys to place orders.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to place an order." };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      total,
      shipping_name: name,
      shipping_email: email,
      shipping_address: address,
      shipping_city: city,
      shipping_postal: postal,
      shipping_country: country,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: orderError?.message ?? "Failed to create order." };
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    product_slug: item.slug,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) {
    return { error: itemsError.message };
  }

  return { orderId: order.id };
}
