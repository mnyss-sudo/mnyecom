export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  featured: boolean;
  created_at: string;
  categories?: Category | null;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
};

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  shipping_name: string;
  shipping_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal: string;
  shipping_country: string;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  quantity: number;
  unit_price: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};
