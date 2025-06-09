"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { useCartModalContext } from "context/CartSidebarModalContext";
import { DEFAULT_OPTION } from "lib/constants";
import { CartItem } from "lib/shopify/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useMyCart } from "./CartProvider";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, cartItems, fetchCart, quantity } = useCartModalContext();
  const [lines, setLines] = React.useState<CartItem[]>([]);
  const { isOpen, setIsOpen } = useMyCart();
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  React.useEffect(() => {
    fetchCart();
  }, []);

  // useEffect(() => {
  //   if (
  //     cart?.totalQuantity &&
  //     cart?.totalQuantity !== quantityRef.current &&
  //     cart?.totalQuantity > 0
  //   ) {
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }
  //     quantityRef.current = cart?.totalQuantity;
  //   }
  // }, [isOpen, cart?.totalQuantity, quantityRef]);

  useEffect(() => {
    console.log("CartModal mounted");
    const cartId = localStorage.getItem("cartId");
    console.log("cart: ", cartId);
    console.log("cartItems: ", cartItems);
    setLines(cartItems || []);
    setIsOpen(true);
  }, [cart]);
  const t = useTranslations("locale");

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={quantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{t("t4")}</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    {t("t12")}
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {lines?.map((item, i) => (
                      <li
                        key={`${i}-${item.product?.id}`}
                        className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                      >
                        <div className="relative flex w-full flex-row justify-between px-1 py-4">
                          <div className="absolute z-40 -ml-1 -mt-2">
                            <DeleteItemButton
                              item={item}
                              optimisticUpdate={() => {}}
                            />
                          </div>
                          <div className="flex flex-row">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                src={item.product?.featuredImage.url || ""}
                                alt={item.product?.title || ""}
                              />
                            </div>
                            <Link
                              href={`/product/${item.product?.handle}`}
                              onClick={closeCart}
                              className="z-30 ml-2 flex flex-row space-x-4"
                            >
                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.product?.title}
                                </span>
                                {item.product?.title !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.product?.title}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                          </div>
                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              className="flex justify-end space-y-2 text-right text-sm"
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                quantity={quantity}
                                optimisticUpdate={() => {}}
                              />
                              <p className="w-6 text-center">
                                <span className="w-full text-sm">
                                  {quantity}
                                </span>
                              </p>
                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                quantity={quantity}
                                optimisticUpdate={() => {}}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>{t("t5")}</p>
                      {/* <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart?.cost?.totalTaxAmount.amount}
                        currencyCode={cart?.cost?.totalTaxAmount.currencyCode}
                      /> */}
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>{t("t6")}</p>
                      <p className="text-right">{t("t8")}</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>{t("t9")}</p>
                      {/* <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost?.totalAmount.amount}
                        currencyCode={cart.cost?.totalAmount.currencyCode}
                      /> */}
                    </div>
                  </div>
                  <form
                    action={(e) => {
                      if (cart && cart.checkoutUrl && cart.id) {
                        console.log(cart.checkoutUrl);
                        redirect(`http://localhost:3001/checkout/${cart.id}/`);
                      } else {
                        console.warn("Cart or checkoutUrl is not available.");
                      }
                    }}
                  >
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />
    </div>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("locale");

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : t("t10")}
    </button>
  );
}
