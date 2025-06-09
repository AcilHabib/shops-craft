"use client";

import { useOrder } from "@/context/OrderProvider";
import { commune, wilaya } from "@/lib/wilaya";
import { ArrowLeft, ChevronDown, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "use-intl";

const Form = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    state,
    setState,
    city,
    setCity,
    address,
    setAddress,
    apartment,
    setApartment,
    handleCreateCOD,
  } = useOrder();
  const t = useTranslations("locale");
  const [zip, setZip] = useState("90001");
  const [shippingMethod, setShippingMethod] = useState("economy");
  const [currentStep, setCurrentStep] = useState("information"); // information, shipping, payment

  return (
    <div className="p-6 border-r border-gray-800">
      <div className="flex items-center space-x-2 mb-6">
        <Link
          href="#"
          className={`${currentStep === "information" ? "text-white" : "text-gray-500"}`}
          onClick={() => setCurrentStep("information")}
        >
          {t("t11")}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <Link
          href="#"
          className={`${currentStep === "shipping" ? "text-white" : "text-gray-500"}`}
          onClick={() => setCurrentStep("shipping")}
        >
          Shipping
        </Link>
      </div>

      {currentStep === "information" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm text-gray-400 mb-1"
              >
                {t("t13")}
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm text-gray-400 mb-1"
              >
                {t("t14")}
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("t15")}</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                {t("t16")}
              </label>
              <input
                type="number"
                id="phone"
                className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={phone}
                placeholder={t("t17")}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("18")}</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm text-gray-400 mb-1"
                >
                  {t("t19")}
                </label>
                <div className="relative">
                  <select
                    id="state"
                    aria-label="State"
                    className="w-full p-3 bg-black border border-gray-700 rounded appearance-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {wilaya.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm text-gray-400 mb-1"
                >
                  {t("t20")}
                </label>
                <div className="relative">
                  <select
                    id="city"
                    aria-label="City"
                    className="w-full p-3 bg-black border border-gray-700 rounded appearance-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {state ? (
                      commune[state as unknown as keyof typeof commune]?.map(
                        (city) => (
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
                        )
                      )
                    ) : (
                      <option value="" disabled>
                        {t("t21")}
                      </option>
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-400 mb-1"
                >
                  {t("22")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <Info className="w-4 h-4 mr-2" />
                <span>{t("t23")}</span>
              </div>

              <div>
                <label
                  htmlFor="apartment"
                  className="block text-sm text-gray-400 mb-1"
                >
                  {t("24")}
                </label>
                <input
                  type="text"
                  id="apartment"
                  value={apartment}
                  className="w-full p-3 bg-black border border-gray-700 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white py-4 px-6 rounded font-medium hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setCurrentStep("shipping");
                }}
              >
                {t("t25")}
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
                  <span className="text-gray-400">{t("t15")}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">sido@gmail.com</span>
                  <button className="ml-4 text-blue-500 text-sm">
                    {t("t28")}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="text-sm">
                  <span className="text-gray-400">{t("t27")}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">
                    tenes, Los Angeles CA 90001, United States
                  </span>
                  <button className="ml-4 text-blue-500 text-sm">
                    {t("t28")}
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{t("t29")}</h2>
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
                      <span className="block">{t("t30")}</span>
                      <span className="block text-sm text-gray-400">
                        5 to 8 {t("t32")}
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
                      <span className="block">{t("t31")}</span>
                      <span className="block text-sm text-gray-400">
                        3 to 4 {t("32")}
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
                  {t("t33")}
                </button>
                <button
                  className="bg-blue-600 text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    handleCreateCOD(e);
                  }}
                >
                  {t("t34")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
