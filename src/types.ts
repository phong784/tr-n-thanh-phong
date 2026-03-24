export interface Product {
  id: number;
  name: string;
  price?: number;
  category: string;
  description: string;
  meaning?: string;
  color?: string;
  size?: string;
  alt_text?: string;
  image: string;
  images?: string; // JSON string of additional image URLs
  is_new: number;
  is_best_seller: number;
  created_at?: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  created_at: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  image?: string;
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: number;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  deliveryDate: string;
  paymentMethod: 'cod' | 'bank_transfer';
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at?: string;
}
