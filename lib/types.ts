export type Category = "frock" | "jabla" | "bodysuit" | "romper" | "gift-set";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  fabric: string;
  colour: string;
  price: number;
  compareAt: number | null;
  badge: string | null;
  organic: boolean;
  sizes: string[];
  ageGroups: string[];
  description: string;
  care: string;
  /** Card background colour */
  tint: string;
  /** Colour the garment illustration is drawn in */
  garment: string;
  inStock: boolean;
  /** Real photos from public/products/<slug>; empty means use the illustration */
  images: string[];
}

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  category: Category;
  price: number;
  size: string;
  qty: number;
  tint: string;
  garment: string;
  image?: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  size: string;
  qty: number;
  price: number;
}

export type PaymentMethod = "upi" | "cod";

export interface Order {
  code: string;
  accessKey: string;
  customerName: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  utr: string | null;
  createdAt: string;
}
