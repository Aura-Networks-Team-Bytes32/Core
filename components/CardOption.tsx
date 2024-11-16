"use client";

// src/components/CardOption.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { CardType } from "@/types/CardType";
//   eslint-disable-next-line
interface CardOptionProps extends CardType {}

const Card = () => {
  return (
    <div className="w-full max-w-[288px] aspect-[1.586/1] rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl relative">
      <div className="absolute top-[10%] left-[5%] right-[10%]">
        <div className="h-4 w-12 bg-yellow-400 rounded-md mb-4" />
        <div className="space-y-2">
          <div className="h-2 w-32 bg-white/60 rounded" />
          <div className="h-2 w-24 bg-white/60 rounded" />
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[10%]">
        <div className="flex gap-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-[6px] w-[6px] min-w-[6px] bg-white/60 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardOption: React.FC<CardOptionProps> = ({
  title,
  features,
  route,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(route)}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      {/* Card Image */}
      <div className="relative w-full h-48 mb-6">
        <Card />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h2>

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardOption;
