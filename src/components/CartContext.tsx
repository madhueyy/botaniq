import React, { createContext, useContext, useState, ReactNode } from "react";

// Item type but with the quantity added
export type Item = {
  itemId: number;
  picUrl: string;
  name: string;
  price: number;
  reviewStars: number;
  reviews: number;
  itemDesc: string;
  quantity: number;
};

type CartContextType = {
  items: Item[];
  addItem: (item: Omit<Item, "quantity">, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  // Function to add item to cart
  const addItem = (newItem: Omit<Item, "quantity">, quantity: number) => {
    setItems((prevItems) => {
      const currItem = prevItems.find((item) => item.itemId === newItem.itemId);

      // If item already exists in cart then update item's quantity,
      // else add the given quantity
      if (currItem) {
        return prevItems.map((item) => {
          // If it's the specified item then update item's quantity,
          // else just return the item
          if (item.itemId === newItem.itemId) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      } else {
        return [...prevItems, { ...newItem, quantity }];
      }
    });
  };

  // Function to remove item from cart
  const removeItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.itemId !== itemId)
    );
  };

  // Function to update item quantity
  const updateItemQuantity = (itemId: number, quantity: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        // If it's the specified item then update item's quantity,
        // else just return the item
        if (item.itemId === itemId) {
          const newQuantity = Math.max(1, Math.min(quantity, 20));

          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });

      return updatedItems;
    });
  };

  // Wrapping children with context provider,
  // gives children components access to CartContext
  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("component has to have access to CartContext");
  }

  return context;
};
