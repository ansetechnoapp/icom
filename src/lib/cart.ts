import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variants?: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) => i.id === item.id && JSON.stringify(i.variants) === JSON.stringify(item.variants)
        );

        if (existingItemIndex !== -1) {
          // If item exists, update quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += item.quantity;

          set({
            items: updatedItems,
            totalItems: get().totalItems + item.quantity,
            subtotal: get().subtotal + item.price * item.quantity,
          });
        } else {
          // If item doesn't exist, add it
          set({
            items: [...items, item],
            totalItems: get().totalItems + item.quantity,
            subtotal: get().subtotal + item.price * item.quantity,
          });
        }
      },
      updateItemQuantity: (id, quantity) => {
        const { items } = get();
        const item = items.find((i) => i.id === id);

        if (!item) return;

        const quantityDiff = quantity - item.quantity;
        const updatedItems = items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );

        set({
          items: updatedItems,
          totalItems: get().totalItems + quantityDiff,
          subtotal: get().subtotal + item.price * quantityDiff,
        });
      },
      removeItem: (id) => {
        const { items } = get();
        const item = items.find((i) => i.id === id);

        if (!item) return;

        set({
          items: items.filter((i) => i.id !== id),
          totalItems: get().totalItems - item.quantity,
          subtotal: get().subtotal - item.price * item.quantity,
        });
      },
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
