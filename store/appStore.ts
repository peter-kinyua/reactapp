import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartLine, Product } from "@/types";

type AppState = {
  loggedIn: boolean;
  cart: CartLine[];
  favorites: string[];
  following: string[];
  readNotifications: string[];
  login: () => void;
  logout: () => void;
  addToCart: (product: Product, options?: { color?: string; size?: string; quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  toggleFollow: (sellerId: string) => void;
  markNotification: (id: string) => void;
  clearCart: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      loggedIn: false,
      cart: [],
      favorites: [],
      following: ["amara"],
      readNotifications: [],
      login: () => set({ loggedIn: true }),
      logout: () => set({ loggedIn: false, cart: [] }),
      addToCart: (product, options) =>
        set((state) => {
          const existing = state.cart.find((line) => line.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((line) =>
                line.product.id === product.id
                  ? { ...line, quantity: line.quantity + (options?.quantity ?? 1) }
                  : line
              )
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                product,
                quantity: options?.quantity ?? 1,
                color: options?.color ?? product.colors[0],
                size: options?.size ?? product.sizes[0]
              }
            ]
          };
        }),
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((line) => line.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((line) => line.product.id !== productId)
            : state.cart.map((line) => (line.product.id === productId ? { ...line, quantity } : line))
        })),
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId]
        })),
      toggleFollow: (sellerId) =>
        set((state) => ({
          following: state.following.includes(sellerId)
            ? state.following.filter((id) => id !== sellerId)
            : [...state.following, sellerId]
        })),
      markNotification: (id) => set((state) => ({ readNotifications: [...new Set([...state.readNotifications, id])] })),
      clearCart: () => set({ cart: [] })
    }),
    {
      name: "lumalive-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        loggedIn: state.loggedIn,
        cart: state.cart,
        favorites: state.favorites,
        following: state.following,
        readNotifications: state.readNotifications
      })
    }
  )
);

export const cartTotals = (cart: CartLine[]) => {
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = cart.length ? 350 : 0;
  const discount = subtotal > 10000 ? 600 : 0;
  return { subtotal, delivery, discount, total: subtotal + delivery - discount };
};
