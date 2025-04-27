'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { CartItem, Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import { useMyCart } from './CartProvider';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { cartItem, setCartItem } = useMyCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  // const [cartState, setCartItem] = useState<CartItem[]>([]);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  const checkExistingItem = (cartItem: CartItem[], productId: string) => {

    console.log('checkExistingItem', cartItem, productId);

    const existingItem = cartItem.find((cartItem) => cartItem.id === productId);
    if (existingItem) {
      console.log('already in cart', existingItem);
      return cartItem.map((cartItem) =>
        cartItem.id === productId
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  } else {
      console.log('ne exist jammais on cart');
      return createCartItem(product);
    }
  }

  const createCartItem = (product: Product) => {

    console.log('createCartItem', product);
    
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
      merchandise: {
        id: product.id,
        title: product.title,
        selectedOptions: product.variants[0]?.selectedOptions ?? [],
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: {
            url: product.featuredImage.url,
            altText: product.featuredImage.altText,
            width: product.featuredImage.width,
            height: product.featuredImage.height,
          },
        },
      },
    };
    return item;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const item: CartItem[] | CartItem = checkExistingItem(cartItem, product.id) || createCartItem(product);

    console.log('item', item);

    if (Array.isArray(item)) {
      setCartItem(item);
    } else {
      const newItem: CartItem[] = [...cartItem, item];
      setCartItem(newItem);
    }
  }


  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
      onSubmit={handleSubmit}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
