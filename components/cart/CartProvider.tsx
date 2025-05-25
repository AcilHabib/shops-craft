'use client';

import { mockCart, products } from "lib/mock";
// import { createCart } from "lib/shopify";
import { Cart, CartItem, Product } from "lib/shopify/types";
import React, { useEffect } from "react";

interface CartContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    cart: Cart | undefined;
    setCart: (cart: Cart) => void;
    cartItem: CartItem[];
    setCartItem: (cartItem: CartItem[]) => void;
    products: Product[];
    // featuredImage: Image;
    // setFeaturedImage: (featuredImage: Image) => void;
    getCartById: (cartId: string) => void;
    handleAddToCart: (event: React.FormEvent, product: Product) => void;
    handleUpdateItemQuantity: (event: React.FormEvent, item: CartItem, type: string) => void;
    handleRemoveFromCart: (event: React.FormEvent, item: CartItem) => void;
}

const cartContext = React.createContext<CartContextType | undefined>(undefined);

const CartProviderContext = ({ children }: {children: React.ReactNode}) => {


    const [isOpen, setIsOpen] = React.useState(false);
    const [cart, setCart] = React.useState<Cart>(mockCart);
    const [cartItem, setCartItem] = React.useState<CartItem[]>([]);

    // useEffect(() => {
    //     // check if the cart already exists in localStorage this mean is does not need to create a new cart
    //     // if not, create a new cart and set it to localStorage
    //     const createCartIfNotExists = async () => {
    //         const isCartEmpty = localStorage.getItem('cart') === null;
    //         if (isCartEmpty) {
    //             console.log('Creating a new cart...');
    //             const res = await fetch(`http://localhost:3000/api/cart`, {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ ...mockCart, checkoutUrl: `${baseUrl}` })
    //             });

    //             if (!res.ok) {
    //                 throw new Error("Failed to create cart");
    //             }

    //             const data = await res.json();

    //             setCart(data.cart);
    //             localStorage.setItem('cartId', data.cart.id);
    //         } else {
    //             console.log('Cart already exists in localStorage:', localStorage.getItem('cartId'));
    //             const res = await fetch(`http://localhost:3000/api/cart?id=${localStorage.getItem('cartId')?.slice(1, -1)}`);
    //             if (!res.ok) {
    //                 throw new Error("Failed to fetch cart");
    //             }
    //             const data = await res.json();
    //             console.log('Fetched cart:', data.cart);
    //             setCart(data.cart);
    //             setCartItem(data.cart.lines);
    //         }
    //     }

    //     createCartIfNotExists();

    // }, []);

    // this is for test if the cart is updated or not
    // this will log the cart whenever it changes
    useEffect(() => {
        console.log('cart', cart);
    }, [cart]);

    // check if the item already exists in the cart
    const checkExistingItem = (product: Product) => {
        // check if the cartItem is empty
        if (cartItem.length !== 0) {
          return cartItem.find((item) => item.productId === product.id);
        }
        
        return undefined;
    }
    
    // create cart item
    // if not, create a new cart item and add it to the cart
    const createCartItem = async (product: Product) => {
            
        if (!product.variants[0]) {
          throw new Error('Product does not have variants');
        }
    
        const item: CartItem = {
          id: product.id ,
          quantity: 1,
          cost: {
            totalAmount: {
              amount: product.variants[0]?.price.amount ?? '',
              currencyCode: product.variants[0]?.price.currencyCode ?? '',
            },
          },
          merchandise: [{
            id: product.id,
            title: product.title,
            selectedOptions: product.variants[0]?.selectedOptions ?? [],
            product: [{
              id: product.id,
              handle: product.handle,
              title: product.title,
              featuredImage: {
                url: product.featuredImage.url,
                altText: product.featuredImage.altText,
                width: product.featuredImage.width,
                height: product.featuredImage.height,
                isFeatured: product.featuredImage.isFeatured,
              },
            }],
          }],
        };

        // get cartId from localStorage
        const cartId = localStorage.getItem('cart');

        const res = await fetch(`http://localhost:3000/api/cart/items?cartId=${cartId?.slice(1, cartId.length - 1)}&productId=${product.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          });
    
          if (!res.ok) {
            throw new Error('Failed to add item to cart');
          }
          
          const data = await res.json();

          if (!data) {
            throw new Error('Failed to add item to cart');
          }

          console.log('Item added to cart:', data.cartItem);
          setCartItem((prev) => [...prev, data.cartItem]);
          setIsOpen(true);
    }

    const getCartById = async (cartId: string) => {
        console.log('cartId', cartId);
        const res = await fetch(`http://localhost:3000/api/cart?id=${cartId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await res.json();

        if (!data) {
            throw new Error('Failed to fetch cart');
        }

        console.log('Fetched cart:', data.cart);

        setCart(data.cart);
        setCartItem(data.cart.lines); 
    }
    
    const handleAddToCart = async (event: React.FormEvent, product: Product) => {
        event.preventDefault();
    
        // check if the product is already in the cart
        const item: CartItem | undefined = checkExistingItem(product);

        console.log('item', item);

        if(item) {

            // check if the same item already exists in the cart with the same id and same variant
            handleUpdateItemQuantity(event, item, "plus")

        } else {
          await createCartItem(product);
        }
      
      }

    const handleUpdateItemQuantity = async (event: React.FormEvent, item: CartItem, type: string) => {
        event.preventDefault();

        console.log('item', item);
    
        const updatedCart = cartItem.map((cartItem: CartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: type === 'plus' ? cartItem.quantity + 1 : cartItem.quantity - 1
            };
          }
          
          return cartItem;
        });
    
        setCartItem(updatedCart);
        setIsOpen(true);

        const res = await fetch(`http://localhost:3000/api/cart/items?id=${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: item.id,
            quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
          })
        });
    
        if (!res.ok) {
          console.error('Failed to update item quantity in cart');
          return;
        }
    
        const data = await res.json();
    
        if (!data) {
          console.error('Failed to update item quantity in cart');
          return;
        }
    
        console.log('Item quantity updated in cart:', data);
    }

    const handleRemoveFromCart = async (event: React.FormEvent, item: CartItem) => {
        event.preventDefault();

        console.log('item', item);

        const res = await fetch(`http://localhost:3000/api/cart/items?id=${item.id}`, {
          method: 'DELETE',
        });
    
        if (!res.ok) {
          console.error('Failed to remove item from cart');
          return;
        }
    
        const data = await res.json();
    
        if (!data) {
          console.error('Failed to remove item from cart');
          return;
        }
    
        console.log('Item removed from cart:', data);
    
        const newCartItem = cartItem.filter((items) => items.id !== item.id)
        setCartItem(newCartItem);
      }
    
    
    return (
        <cartContext.Provider value={{ 
            isOpen,
            setIsOpen,
            cart, 
            setCart, 
            cartItem, 
            setCartItem, 
            products,
            getCartById,
            handleAddToCart,
            handleUpdateItemQuantity, 
            handleRemoveFromCart 
        }}>
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