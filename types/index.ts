export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  verified: boolean;
  followers: string;
  rating: number;
  bio: string;
};

export type Product = {
  id: string;
  name: string;
  sellerId: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  colors: string[];
  sizes: string[];
  category: string;
};

export type LiveShow = {
  id: string;
  sellerId: string;
  productId: string;
  title: string;
  thumbnail: string;
  viewers: string;
  startsAt?: string;
  live: boolean;
};

export type CartLine = {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
};

export type Order = {
  id: string;
  status: "active" | "completed" | "cancelled";
  title: string;
  total: number;
  date: string;
  image: string;
  step: number;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: string;
};
