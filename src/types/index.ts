export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  purchasingPrice: number;
  image: string;
  vendor: string;
  status: 'active' | 'inactive';
  colors: string[];
  sizes: string[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface RecipientDetails {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  zipCode: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  recipient: RecipientDetails;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  purchasingPrice: number;
  price: number;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  vendors: string[];
}
