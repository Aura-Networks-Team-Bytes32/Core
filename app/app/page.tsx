import Navbar from "@/components/Navbar";
import React from "react";
import CardOption from "@/components/CardOption";
import { CardType } from "@/types/CardType";

const cardOptions: (CardType & {
  isDebitCard?: boolean;
})[] = [
  {
    title: "Debit Card", // Add your card images to public/images/
    features: [
      "Seamless fiat on-ramp and pay",
      "Instant USDC payments with low fees",
    ],
    route: "/debitcard",
    isDebitCard: true,
  },
  {
    title: "Credit Card",
    features: [
      "Credit limits based on traditional credit score via Chainlink DECO",
      "Secure, private credit data verification on-chain",
    ],
    route: "/creditcard",
  },
  {
    title: "FD Credit Card",
    features: [
      "Instant credit limit of your staked assets",
      "Earn yield on your staked assets while maintaining credit line",
    ],
    route: "/fd-creditcard",
  },
];

const page = () => {
  return (
    <main>
      <Navbar pageType="app" />
      <div className="container mx-auto px-4">
        <div className="pt-24 pb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Choose Your Card
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardOptions.map((card, index) => (
              <CardOption key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
