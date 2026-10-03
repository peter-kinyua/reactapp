import { Category, LiveShow, Notification, Order, Product, Seller } from "@/types";

export const categories: Category[] = [
  { id: "fashion", name: "Fashion", icon: "shirt-outline" },
  { id: "beauty", name: "Beauty", icon: "sparkles-outline" },
  { id: "electronics", name: "Electronics", icon: "phone-portrait-outline" },
  { id: "home", name: "Home", icon: "home-outline" },
  { id: "lifestyle", name: "Lifestyle", icon: "cafe-outline" },
  { id: "collectibles", name: "Collectibles", icon: "diamond-outline" },
  { id: "deals", name: "Deals", icon: "pricetag-outline" }
];

export const sellers: Seller[] = [
  {
    id: "amara",
    name: "Amara Atelier",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&q=80",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    verified: true,
    followers: "48.2K",
    rating: 4.9,
    bio: "Contemporary wardrobe edits, styled live from Nairobi."
  },
  {
    id: "glow",
    name: "Glow Lab KE",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=240&q=80",
    cover: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
    verified: true,
    followers: "31.7K",
    rating: 4.8,
    bio: "Clean beauty drops and skin-first routines."
  },
  {
    id: "volt",
    name: "Volt House",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&q=80",
    cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    verified: false,
    followers: "19.4K",
    rating: 4.7,
    bio: "Smart devices, everyday tech, live demos."
  }
];

export const products: Product[] = [
  {
    id: "linen-blazer",
    name: "Ivory Linen Relaxed Blazer",
    sellerId: "amara",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=85"
    ],
    price: 6800,
    oldPrice: 8200,
    discount: "17% off",
    rating: 4.9,
    reviews: 214,
    stock: 18,
    description: "A softly tailored blazer with breathable linen texture, deep pockets, and an easy drape for workdays or dinner plans.",
    colors: ["Ivory", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "fashion"
  },
  {
    id: "serum-duo",
    name: "Radiance Serum Duo",
    sellerId: "glow",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85",
    gallery: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85"],
    price: 3400,
    oldPrice: 4100,
    discount: "Bundle deal",
    rating: 4.8,
    reviews: 542,
    stock: 42,
    description: "Vitamin C and hyaluronic acid serums packed as a brightening morning and hydration evening routine.",
    colors: ["Amber", "Clear"],
    sizes: ["30ml", "50ml"],
    category: "beauty"
  },
  {
    id: "buds",
    name: "Pulse Mini Wireless Buds",
    sellerId: "volt",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900&q=85",
    gallery: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900&q=85"],
    price: 5900,
    oldPrice: 7200,
    discount: "Save 1,300",
    rating: 4.7,
    reviews: 128,
    stock: 25,
    description: "Pocket-sized wireless earbuds with crisp calls, punchy bass, and a 28-hour charging case.",
    colors: ["Graphite", "Cloud", "Blue"],
    sizes: ["Standard"],
    category: "electronics"
  }
];

export const liveShows: LiveShow[] = [
  {
    id: "live-1",
    sellerId: "amara",
    productId: "linen-blazer",
    title: "Capsule wardrobe pieces under 9K",
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85",
    viewers: "2.8K",
    live: true
  },
  {
    id: "live-2",
    sellerId: "glow",
    productId: "serum-duo",
    title: "Morning glow routine and live Q&A",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85",
    viewers: "914",
    live: true
  },
  {
    id: "live-3",
    sellerId: "volt",
    productId: "buds",
    title: "Tiny tech, big sound test",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85",
    viewers: "Tomorrow 8:00 PM",
    startsAt: "Tomorrow 8:00 PM",
    live: false
  }
];

export const chatMessages = [
  "Do you have this in black?",
  "What sizes are available?",
  "Just ordered mine!",
  "Can you show the back?",
  "That ivory color is perfect."
];

export const orders: Order[] = [
  { id: "LL-20418", status: "active", title: "Ivory Linen Relaxed Blazer", total: 7350, date: "Today", image: products[0].image, step: 2 },
  { id: "LL-19862", status: "completed", title: "Radiance Serum Duo", total: 3650, date: "Sep 28", image: products[1].image, step: 4 },
  { id: "LL-19110", status: "cancelled", title: "Pulse Mini Wireless Buds", total: 5900, date: "Sep 19", image: products[2].image, step: 1 }
];

export const notifications: Notification[] = [
  { id: "n1", title: "Amara Atelier is live", body: "Capsule wardrobe pieces are being styled now.", time: "2m", unread: true, icon: "radio-outline" },
  { id: "n2", title: "Order confirmed", body: "Your order LL-20418 is now preparing.", time: "18m", unread: true, icon: "cube-outline" },
  { id: "n3", title: "Glow Lab flash deal", body: "Serum bundles are 15% off until midnight.", time: "1h", unread: false, icon: "pricetag-outline" }
];

export const currentUser = {
  name: "Maya Njeri",
  email: "maya.njeri@example.com",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&q=80"
};

export const sellerById = (id: string) => sellers.find((seller) => seller.id === id) ?? sellers[0];
export const productById = (id: string) => products.find((product) => product.id === id) ?? products[0];
