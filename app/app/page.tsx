"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import CardOption from "@/components/CardOption";
import { CardType } from "@/types/CardType";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const cardOptions: (CardType & {
  isDebitCard?: boolean;
  isDisabled?: boolean;
})[] = [
  {
    title: "Debit Card", // Add your card images to public/images/
    features: [
      "Seamless fiat on-ramp and pay",
      "Instant USDC payments with 0 fee",
    ],
    route: "/debitcard",
    isDebitCard: true,
    isDisabled: false,
  },
  {
    title: "Credit Card",
    features: [
      "Credit limits based on traditional credit score via Chainlink DECO",
      "Secure, private credit data verification on-chain",
    ],
    route: "/creditcard",
    isDisabled: true,
  },
  {
    title: "FD Credit Card",
    features: [
      "Instant credit limit of your staked assets",
      "Earn yield on your staked assets while maintaining credit line",
    ],
    route: "/fd-creditcard",
    isDisabled: true,
  },
];

const App = () => {
  const router = useRouter();
  return (
    <main>
      <Navbar pageType="app" />
      <div className="container mx-auto px-4">
        <div className="pt-24 pb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            For Retail Customers
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardOptions.map((card, index) => (
              <CardOption key={index} {...card} />
            ))}
          </div>
        </div>
        <div className="pb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            For Business Owners
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              onClick={() =>
                router.push("/merchant/onboard")
              }
              className="relative bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-xl cursor-pointer"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                Become a Merchant
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Web3-Enabled Payment Gateway
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Secure Business Operations
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
