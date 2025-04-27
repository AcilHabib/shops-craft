'use client';

import { mockCart } from "lib/mock";
import { Cart, CartItem } from "lib/shopify/types";
import React from "react";

interface CartContextType {
    cart: Cart | undefined;
    setCart: (cart: Cart) => void;
    cartItem: CartItem[];
    setCartItem: (cartItem: CartItem[]) => void;
}

const cartContext = React.createContext<CartContextType | undefined>(undefined);

const CartProviderContext = ({ children }: {children: React.ReactNode}) => {

    const [cart, setCart] = React.useState<Cart>(mockCart);
    const [cartItem, setCartItem] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        console.log('cartItem', cartItem);
        setCart((prevCart) => ({
            ...prevCart,
            lines: cartItem,
            totalQuantity: cartItem.reduce((acc, item) => acc + item.quantity, 0),
            cost: {
                subtotalAmount: {
                    amount: cartItem.reduce((total, item) => total + (Number(item.cost.totalAmount.amount) * item.quantity), 0).toString(),
                    currencyCode: "USD" // Replace with the appropriate currency code
                },
                totalAmount: {
                    amount: (cartItem.reduce((total, item) => total + (Number(item.cost.totalAmount.amount) * item.quantity), 0) + Number(prevCart.cost.totalTaxAmount.amount)).toString(), // Replace with the appropriate calculation or value
                    currencyCode: "USD"
                },
                totalTaxAmount: {
                    amount: prevCart.cost.totalTaxAmount.amount, // Replace with the appropriate calculation or value
                    currencyCode: prevCart.cost.totalTaxAmount.currencyCode,
                }
            }
        }));
    }, [cartItem]);

    React.useEffect(() => {
        console.log('cart', cart);
    }, [cart]);
    
    return (
        <cartContext.Provider value={{ cart, setCart, cartItem, setCartItem }}>
            {children}
        </cartContext.Provider>
    )
}

export const useMyCart = () => {
    const context = React.useContext(cartContext);
    if (context === undefined) {
        throw new Error('useMyCart must be used within a CartProvider');
    }
    return context;
}

export default CartProviderContext;