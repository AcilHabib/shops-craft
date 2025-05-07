"use client";

// import { useCart } from "components/cart/cart-context";
import { useMyCart } from "components/cart/CartProvider";
import { DeleteItemButton } from "components/cart/delete-item-button";
import { EditItemQuantityButton } from "components/cart/edit-item-quantity-button";
import Price from "components/price";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Info,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function CheckoutPage() {

  const [ emailOrPhone, setEmailOrPhone ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ country, setCountry ] = useState("US");
  const [ address, setAddress ] = useState("");
  const [ apartment, setApartment ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("CA");
  const [ zip, setZip ] = useState("90001");
  // const [ saveInfo, setSaveInfo ] = useState(false);
  const [ shippingMethod, setShippingMethod ] = useState("economy");
  // const [ paymentMethod, setPaymentMethod ] = useState("creditCard");

  const [currentStep, setCurrentStep] = useState("information"); // information, shipping, payment
  const { cart } = useMyCart();
  // const { updateCartItem } = useCart();

  type MerchandiseSearchParams = {
    [key: string]: string;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
      e.preventDefault();

      console.log(emailOrPhone, firstName, lastName, country, address, apartment, city, state, zip);

      const cartId = localStorage.getItem("cart")?.slice(1, -1) || "";

      console.log(cartId);

      const res = await fetch(`/api/orders/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrPhone,
          firstName,
          lastName,
          phone: "",
          order: {
            deleveryType: shippingMethod,
          },
          cartId,
          address: {
            address,
            appartment: apartment,
            city,
            state,
            zipCode: zip,
          },
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error("Error creating customer:", data.message);
        return;
      }

      console.log("Customer created:", data.order);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/">
            <div className="w-8 h-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Form */}
          <div className="p-6 border-r border-gray-800">
            <div className="flex items-center space-x-2 mb-6">
              <Link
                href="#"
                className={`${currentStep === "information" ? "text-white" : "text-gray-500"}`}
                onClick={() => setCurrentStep("information")}
              >
                Information
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link
                href="#"
                className={`${currentStep === "shipping" ? "text-white" : "text-gray-500"}`}
                onClick={() => setCurrentStep("shipping")}
              >
                Shipping
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link
                href="#"
                className={`${currentStep === "payment" ? "text-white" : "text-gray-500"}`}
                onClick={() => setCurrentStep("payment")}
              >
                Payment
              </Link>
            </div>

            {currentStep === "information" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Contact</h2>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-400 mb-1"
                    >
                      Email or mobile phone number
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      defaultValue="sido@gmail.com"
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="h-4 w-4 border-gray-700 rounded bg-black"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm">
                      {/* Email me with news and offers */}
                    </label>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Shipping address</h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm text-gray-400 mb-1"
                      >
                        Country/Region
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          className="w-full p-3 bg-black border border-gray-700 rounded appearance-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          defaultValue="US"
                          // onClick={(e) => {console.log(e.target);console.log(e)}}
                          onChange={(e) => {setCountry(e.target.value)}}
                          // onSelect={(e) => setCountry(e.target.value)}
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          First name (optional)
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          defaultValue="sido"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          defaultValue="sido"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm text-gray-400 mb-1"
                      >
                        Address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="address"
                          className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          defaultValue="tenes"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" /> */}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <Info className="w-4 h-4 mr-2" />
                      <span>Add a house number if you have one</span>
                    </div>

                    <div>
                      <label
                        htmlFor="apartment"
                        className="block text-sm text-gray-400 mb-1"
                      >
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e) => setApartment(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm text-gray-400 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue="Los Angeles"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            id="state"
                            className="w-full p-3 bg-black border border-gray-700 rounded appearance-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="CA"
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          ZIP code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          defaultValue="90001"
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        className="h-4 w-4 border-gray-700 rounded bg-black"
                      />
                      <label htmlFor="saveInfo" className="ml-2 text-sm">
                        Save this information for next time
                      </label>
                    </div>

                    <button
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        setCurrentStep("shipping");
                      }}
                    >
                      Continue to shipping
                    </button>
                  </div>
                </div>
              </>
            )}

            {currentStep === "shipping" && (
              <>
                <div className="mb-6">
                  <div className="border border-gray-800 rounded mb-6">
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                      <div className="text-sm">
                        <span className="text-gray-400">Contact</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">sido@gmail.com</span>
                        <button className="ml-4 text-blue-500 text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <div className="text-sm">
                        <span className="text-gray-400">Ship to</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">
                          tenes, Los Angeles CA 90001, United States
                        </span>
                        <button className="ml-4 text-blue-500 text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Shipping method</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-800 rounded overflow-hidden">
                      <label className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-800">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="economy"
                            className="h-4 w-4 text-blue-600 border-gray-700 bg-black"
                            defaultChecked
                            onChange={(e) => setShippingMethod(e.target.value)}
                          />
                          <div className="ml-3">
                            <span className="block">Economy</span>
                            <span className="block text-sm text-gray-400">
                              5 to 8 business days
                            </span>
                          </div>
                        </div>
                        <span className="font-medium">$4.90</span>
                      </label>
                      <label className="flex items-center justify-between p-4 cursor-pointer">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            className="h-4 w-4 text-blue-600 border-gray-700 bg-black"
                            onChange={(e) => setShippingMethod(e.target.value)}
                          />
                          <div className="ml-3">
                            <span className="block">Standard</span>
                            <span className="block text-sm text-gray-400">
                              3 to 4 business days
                            </span>
                          </div>
                        </div>
                        <span className="font-medium">$9.90</span>
                      </label>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        className="flex items-center text-blue-500"
                        onClick={() => setCurrentStep("information")}
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Return to information
                      </button>
                      <button
                        className="bg-blue-600 text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors"
                        onClick={(e) => {setCurrentStep("payment"); handleSubmitOrder(e);}}
                      >
                        Continue to payment
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === "payment" && (
              <>
                <div className="mb-6">
                  <div className="border border-gray-800 rounded mb-6">
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                      <div className="text-sm">
                        <span className="text-gray-400">Contact</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">sido@gmail.com</span>
                        <button className="ml-4 text-blue-500 text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                      <div className="text-sm">
                        <span className="text-gray-400">Ship to</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">
                          tenes, Los Angeles CA 90001, United States
                        </span>
                        <button className="ml-4 text-blue-500 text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <div className="text-sm">
                        <span className="text-gray-400">Shipping method</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">Economy · $4.90</span>
                        <button className="ml-4 text-blue-500 text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Payment</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    All transactions are secure and encrypted.
                  </p>

                  <div className="bg-gray-900 rounded-lg p-8 mb-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 bg-gray-800 p-4 rounded-full">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-300">
                      This store can't accept payments right now.
                    </p>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      className="flex items-center text-blue-500"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Return to shipping
                    </button>
                    <button className="bg-gray-700 text-white py-3 px-6 rounded font-medium cursor-not-allowed">
                      Pay now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right side - Order summary */}
          {!cart || cart.lines.length === 0 ? (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              {/* <ShoppingCart className="h-16" /> */}
              <p className="mt-6 text-center text-2xl font-bold">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <ul className="grow overflow-auto py-4">
              {cart.lines.map((item, i) => 
                    item.merchandise.map((merchandise) =>
                      merchandise.product.map((product) => (
                          <li
                            key={i}
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
                                  {/* <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText || item.merchandise.product.title
                                    }
                                    src={item.merchandise.product.featuredImage.url}
                                  /> */}
                                </div>
                                <Link
                                  href={""}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    {/* <span className="leading-tight">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !== DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {item.merchandise.title}
                                      </p> */}
                                    {/* ) : null} */}
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
                                    optimisticUpdate={() => {}}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={() => {}}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        ))))}
              </ul>
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart.cost.totalTaxAmount.amount}
                    currencyCode={cart.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 text-sm text-gray-500">
            <p>All rights reserved Dev Vercel Shop</p>
          </div>
        </div>
      </div>
    </div>
  );
}
