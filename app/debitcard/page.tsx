import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const ProcessStep = ({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isLast?: boolean;
}) => (
  <div className="relative flex flex-col items-center md:items-start">
    {/* Step Number and Icon */}
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>

    {/* Content */}
    <div className="text-center md:text-left mb-8 md:mb-0">
      <div className="text-sm text-blue-600 font-semibold mb-1">
        Step {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-sm">
        {description}
      </p>
    </div>

    {/* Connector Line */}
    {!isLast && (
      <>
        {/* Desktop connector */}
        <div className="hidden md:block absolute top-8 left-[calc(100%_-_2rem)] w-[calc(100%_-_4rem)] h-0.5 bg-gray-200">
          <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        {/* Mobile connector */}
        <div className="md:hidden absolute top-[calc(100%_-_1rem)] left-1/2 h-8 w-0.5 bg-gray-200" />
      </>
    )}
  </div>
);

const DebitCardPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar pageType="cards" />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started with Your Web3 Debit Card
            </h1>
            <p className="text-lg text-gray-600">
              Complete these two simple steps to activate
              your card and start enjoying secure,
              blockchain-powered payments
            </p>
          </div>

          {/* Card Preview */}
          <div className="flex justify-center mb-16 relative">
            <div className="w-72 h-44 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl transform hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-4 left-4 right-4">
                <div className="h-4 w-12 bg-yellow-400 rounded-md mb-4" />
                <div className="space-y-2">
                  <div className="h-2 w-32 bg-white/60 rounded" />
                  <div className="h-2 w-24 bg-white/60 rounded" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-3 w-3 bg-white/60 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 -left-4 w-72 h-44 bg-blue-600 rounded-xl transform -rotate-6 opacity-20 blur-xl" />
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative px-4">
            <ProcessStep
              number="01"
              title="Sign in with Google"
              description="Connect your Google account securely for a streamlined verification process"
              icon={Mail}
            />
            <ProcessStep
              number="02"
              title="World ID Verification"
              description="Verify your identity using World ID's secure proof-of-personhood protocol"
              icon={Shield}
              isLast
            />
          </div>

          {/* Action Card */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Begin?
                </h3>
                <p className="text-gray-600">
                  Start the verification process to get your
                  Web3 debit card
                </p>
              </div>
              <Link
                href="/debitcard/onboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Start Verification
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DebitCardPage;
