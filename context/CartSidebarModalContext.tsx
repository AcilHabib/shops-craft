"use client";
import { ShowToast } from "components/ShowToast";
import { Product } from "lib/shopify/types";
import React, { createContext, useContext, useState } from "react";
import { createCart, createCartItem, deleteCartItem, getCart, updateCartItem } from "../app/requests/cart";
import { Cart, CartItem } from "../lib/shopify/types";

interface CartModalContextType {
  isCartModalOpen: boolean;
  openCartModal: () => void;
  closeCartModal: () => void;
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  cartItems: CartItem[];
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleAddToCart: (item: Product) => Promise<void>;
  handleUpdateItemQuantity: (type: "increment" | "decrement", item: CartItem, quantity: number) => void;
  handleUpdateCartCost: (type: "increment" | "decrement", quantity: number) => void;
  handleRemoveFromCart: (item: CartItem) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined
);

export const useCartModalContext = () => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [quantity, setQuantity] = useState(0);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const fetchCart = async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        const cart = await createCart("");
        if (!cart) throw new Error("No cart found");
        localStorage.setItem("cartId", cart.id);
        setCart(cart);
        setCartItems(cart.lines);
      } else {
        const cart = await getCart(cartId);
        if (!cart) throw new Error("No cart found");
        setCart(cart);
        setCartItems(cart.lines);
      }
    }

  const handleAddToCart = async (item: Product) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      throw new Error("No cartId found in localStorage");
    }
    //check if the item already exists in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.product?.id === item.id);
    if (existingItem) {
      ShowToast("Item already exists in the cart", "info");
      setQuantity(existingItem.quantity);
      // If it exists, update the quantity
      handleUpdateItemQuantity("increment", existingItem, quantity);
    } else {
      // If it doesn't exist, add it to the cart
      // Create a new cart item
      const newItem = await createCartItem(cartId, item.id);
      // Check if the new item was created successfully
      if (!newItem) {
        throw new Error("Failed to create cart item");
      }
      // Add the new item to the cart
      setCartItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
      ShowToast("Item added to cart", "success");
      handleUpdateCartCost("increment", 1);
    }
  };

  const handleUpdateItemQuantity = async (type: "increment" | "decrement", item: CartItem, quantity: number) => {
    if (quantity === 1 && type === "decrement") return;
    // Update the quantity of the item in the cart
    if (type === "increment") {
      quantity += 1;
    } else if (type === "decrement") {
      quantity -= 1;
    }
    const updatedItem = await updateCartItem(item, quantity);
    if (!updatedItem) throw new Error("Failed to update cart item");
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.product?.id === updatedItem.id ? { ...cartItem, quantity } : cartItem
      )
    );
    handleUpdateCartCost(type, quantity);
    setQuantity(quantity);
    ShowToast(`Item quantity updated to ${quantity}`, "success");
  };

  const handleUpdateCartCost = (type: "increment" | "decrement", quantity: number) => {
    // Update the cart cost based on the quantity
    if (type === "increment") {
      quantity += 1;
    } else if (type === "decrement") {
      quantity -= 1;
    }
    setCart((prevCart) => {
      if (!prevCart) return prevCart; // or return null;
      return {
        ...prevCart,
        totalQuantity: prevCart.totalQuantity + quantity,
        cost: {
          ...prevCart.cost,
          totalAmount: {
            ...prevCart.cost.totalAmount,
            amount: (parseFloat(prevCart.cost.totalAmount.amount || "0") + quantity).toString(),
          },
          subtotalAmount: {
            ...prevCart.cost.subtotalAmount,
            amount: (parseFloat(prevCart.cost.subtotalAmount.amount || "0") + quantity).toString(),
          },
          totalTaxAmount: {
            ...prevCart.cost.totalTaxAmount,
            amount: (parseFloat(prevCart.cost.totalTaxAmount.amount || "0") + quantity).toString(),
          },
        },
      };
    });
  }

  const handleRemoveFromCart = async (item: CartItem) => {
    try {
      if (!item.id) throw new Error("Cart item id is undefined");
      const deletedItem = await deleteCartItem(item.id);
      if (!deletedItem) throw new Error("Failed to delete item from cart");
      setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
      handleUpdateCartCost("decrement", item.quantity);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  }

  return (
    <CartModalContext.Provider
      value={{ 
        isCartModalOpen, 
        openCartModal, 
        closeCartModal,
        cart,
        setCart,
        cartItems,
        quantity,
        setQuantity,
        setCartItems, 
        handleAddToCart,
        handleUpdateItemQuantity,
        handleUpdateCartCost,
        handleRemoveFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartModalContext.Provider>
  );
};
