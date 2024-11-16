"use client";
import Navbar from "@/components/Navbar";
import {
  getMerchantToken,
  setMerchantToken,
} from "@/utils/cache";
import { generateRandomToken } from "@/utils/token";
import React, { useState, useEffect } from "react";

const MerchantDashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const cachedToken = getMerchantToken();
    if (cachedToken) {
      setToken(cachedToken);
    } else {
      const newToken = generateRandomToken();
      setMerchantToken(newToken);
      setToken(newToken);
    }
  }, []);
  return (
    <div>
      <Navbar pageType="merchant" />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Merchant Dashboard
            </h1>
            <p className="text-lg text-gray-600">{token}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
