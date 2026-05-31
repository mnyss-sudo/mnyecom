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
  category: string;
  category_slug: string;
  brand: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
};

export type Customer = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
};

export type Order = {
  id: string;
  customer_id: string | null;
  order_number: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: string | null;
  payment_status: string | null;
  order_status: string;
  notes: string | null;
  created_at: string;
  customers?: Customer | null;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};
