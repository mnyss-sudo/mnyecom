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
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const country = String(formData.get("country") ?? "Pakistan").trim();

  if (!name || !email || !address || !city) {
    return { error: "Please fill in all required fields." };
  }

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase is not configured. Add your project keys to place orders.",
    };
  }

  const subtotal = orderTotal(items);
  const shippingCost = 0;
  const total = subtotal + shippingCost;
  const orderNumber = `SN-${Date.now()}`;

  const supabase = await createClient();

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        full_name: name,
        phone: phone || null,
        address,
        city,
        country,
      },
      { onConflict: "email" },
    )
    .select("id")
    .single();

  if (customerError || !customer) {
    return { error: customerError?.message ?? "Failed to save customer details." };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customer.id,
      order_number: orderNumber,
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_method: "Cash on Delivery",
      payment_status: "Pending",
      order_status: "Pending",
      notes: phone ? `Phone: ${phone}` : null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: orderError?.message ?? "Failed to create order." };
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: Number(item.productId),
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) {
    return { error: itemsError.message };
  }

  return { orderId: String(order.id) };
}
