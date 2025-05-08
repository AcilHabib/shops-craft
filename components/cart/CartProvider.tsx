'use client';

import { mockCart, products } from "lib/mock";
// import { createCart } from "lib/shopify";
import { Cart, CartItem, Image, Product } from "lib/shopify/types";
import { baseUrl } from "lib/utils";
import React, { use, useEffect } from "react";

interface CartContextType {
    cart: Cart | undefined;
    setCart: (cart: Cart) => void;
    cartItem: CartItem[];
    setCartItem: (cartItem: CartItem[]) => void;
    products: Product[];
    featuredImage: Image;
    setFeaturedImage: (featuredImage: Image) => void;
    getCartById: (cartId: string) => void;
    handleAddToCart: (event: React.FormEvent, product: Product) => void;
    handleUpdateItemQuantity: (event: React.FormEvent, item: CartItem, type: string) => void;
    handleRemoveFromCart: (event: React.FormEvent, item: CartItem) => void;
}

const cartContext = React.createContext<CartContextType | undefined>(undefined);

const CartProviderContext = ({ children }: {children: React.ReactNode}) => {

    const [cart, setCart] = React.useState<Cart>(mockCart);
    const [cartItem, setCartItem] = React.useState<CartItem[]>([]);
    const [featuredImage, setFeaturedImage] = React.useState<Image>({
        url: '', 
        altText: '', 
        width: 0, 
        height: 0, 
        isFeatured: false
    });

    useEffect(() => {
      console.log('featuredImage', featuredImage);
    }, [featuredImage])

    useEffect(() => {
        // check if the cart already exists in localStorage this mean is does not need to create a new cart
        // if not, create a new cart and set it to localStorage
        const createCartIfNotExists = async () => {
            const isCartEmpty = localStorage.getItem('cart') === null;
            if (isCartEmpty) {
                console.log('Creating a new cart...');
                const res = await fetch(`/api/carts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...mockCart, checkoutUrl: `${baseUrl}` })
                });

                if (!res.ok) {
                    throw new Error("Failed to create cart");
                }

                const data = await res.json();

                setCart(data.cart);
                localStorage.setItem('cart', JSON.stringify(data.cart.id));
            } else {
                console.log('Cart already exists in localStorage:', localStorage.getItem('cart'));
                const res = await fetch(`/api/carts/cart?cartId=${localStorage.getItem('cart')?.slice(1, -1)}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch cart");
                }
                const data = await res.json();
                console.log('Fetched cart:', data.cart);
                setCart(data.cart);
                setCartItem(data.cart.lines);
            }
        }

        createCartIfNotExists();

    }, []);

    // this is for test if the cart is updated or not
    // this will log the cart whenever it changes
    useEffect(() => {
        console.log('cart', cart);
    }, [cart]);

    // 
    React.useEffect(() => {
        // Update the cart state whenever cartItem changes
        // This will also update the total quantity and cost based on the cartItem array
        setCart((prevCart) => ({
            ...prevCart,
            lines: cartItem,
            totalQuantity: cartItem.reduce((acc, item) => acc + item.quantity, 0),
            cost: {
                subtotalAmount: {
                    amount: cartItem.reduce((total, item) => total + (Number(item.cost.totalAmount.amount) * item.quantity), 0).toString(),
                    currencyCode: "USD"
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

    // check if the item already exists in the cart
    const checkExistingItem = (product: Product) => {
        return cartItem.find((item) => item.productId === product.id);
    }
    
    // create cart item
    // if not, create a new cart item and add it to the cart
    const createCartItem = async (product: Product): Promise<CartItem> => {
            
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

        const res = await fetch(`/api/carts/items?cartId=${cartId?.slice(1, cartId.length - 1)}&productId=${product.id}`, {
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

          const featuredImage = data.cartItem.product.images.find((image: any) => image.isFeatured);

          setFeaturedImage(featuredImage);

          const updatedCartItem = { ...data.cartItem, product: { ...data.cartItem.product, featuredImage: { ...featuredImage } } };

          console.log('featuredImage', featuredImage);
          console.log('updatedCartItem', updatedCartItem);
        
        return updatedCartItem;
    }

    const getCartById = async (cartId: string) => {
        console.log('cartId', cartId);
        const res = await fetch(`/api/carts/cart?cartId=${cartId}`, {
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

        console.log(item);  
        
        if(item) {

            // check if the same item already exists in the cart with the same id and same variant
            console.log('already in cart', item);

            handleUpdateItemQuantity(event, item, "plus")
       
        } else {
          
          const item = await createCartItem(product);
          const newItem: CartItem[] = [...cartItem, item];
          
          setCartItem(newItem);
        }
      
      }

    const handleUpdateItemQuantity = async (event: React.FormEvent, item: CartItem, type: string) => {
        event.preventDefault();
    
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
    
        const res = await fetch(`/api/carts/items?id=${item.id}`, {
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
    
        const res = await fetch(`/api/carts/items?id=${item.id}`, {
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
            cart, 
            setCart, 
            cartItem, 
            setCartItem, 
            products,
            featuredImage,
            setFeaturedImage,
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