"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import generateRandomDebitCard from "@/utils/card";
import {
  setCardDetails,
  getCardDetails,
} from "@/utils/cache";
import Navbar from "@/components/Navbar";

interface CardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const CopyButton = ({
  text,
  label,
}: {
  text: string;
  label: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-white/10 rounded-full transition-colors group relative"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-white/70 group-hover:text-white" />
      )}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? "Copied!" : `Copy ${label}`}
      </span>
    </button>
  );
};

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [cardDetails, setCardDetailsState] =
    useState<CardDetails | null>(null);
  const [showCVV, setShowCVV] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // Check cache first
    const cachedDetails = getCardDetails();
    if (cachedDetails) {
      setCardDetailsState(cachedDetails);
    } else {
      // Generate new card details if not in cache
      const newCardDetails = generateRandomDebitCard();
      setCardDetailsState(newCardDetails);
      setCardDetails(newCardDetails);
    }
  }, []);

  if (status === "loading" || !cardDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const formatCardNumber = (number: string) => {
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar pageType="debitcard" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto pt-16">
          {/* Card Display */}
          <div className="relative w-full max-w-md mx-auto perspective-1000">
            <div className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 shadow-xl hover:scale-105 transition-transform duration-300">
              {/* Chip */}
              <div className="absolute top-6 left-6">
                <div className="h-10 w-12 bg-yellow-400/90 rounded-md shadow-inner" />
              </div>

              {/* Card Number */}
              <div className="absolute top-24 left-6 right-6">
                <div className="flex items-center justify-between text-white text-xl md:text-2xl font-mono tracking-wider">
                  <span>
                    {formatCardNumber(
                      cardDetails.cardNumber
                    )}
                  </span>
                  <CopyButton
                    text={cardDetails.cardNumber}
                    label="card number"
                  />
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <div className="text-white/70 text-xs mb-1">
                    VALID THRU
                  </div>
                  <div className="text-white font-mono flex items-center gap-2">
                    {cardDetails.expirationDate}
                    <CopyButton
                      text={cardDetails.expirationDate}
                      label="expiry"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-xs mb-1">
                    CVV
                  </div>
                  <div className="text-white font-mono flex items-center gap-2">
                    <button
                      onClick={() => setShowCVV(!showCVV)}
                      className="flex items-center gap-2"
                    >
                      {showCVV ? cardDetails.cvv : "•••"}
                      {showCVV ? (
                        <EyeOff className="w-4 h-4 text-white/70" />
                      ) : (
                        <Eye className="w-4 h-4 text-white/70" />
                      )}
                    </button>
                    <CopyButton
                      text={cardDetails.cvv}
                      label="CVV"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
