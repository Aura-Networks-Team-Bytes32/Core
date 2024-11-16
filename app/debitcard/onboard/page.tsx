// src/app/debitcard/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  useSession,
  signOut,
  signIn,
} from "next-auth/react";
import {
  Mail,
  Shield,
  Loader2,
  LogOut,
  CheckCircle,
  Copy,
} from "lucide-react";
import useAccounts from "@/hooks/useAccounts";
import useAuthenticate from "@/hooks/useAuthenticate";
import useSessionHook from "@/hooks/useSession";
import {
  ORIGIN,
  litAuthClient,
  signInWithGoogle,
} from "@/utils/lit";
import {
  AuthMethodType,
  ProviderType,
} from "@lit-protocol/constants";
import Navbar from "@/components/Navbar";
/* eslint-disable */

const VerificationStep = ({
  title,
  description,
  icon: Icon,
  actionButton,
  isCompleted,
  isActive,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  actionButton?: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
}) => (
  <div
    className={`bg-white rounded-xl p-6 md:p-8 shadow-sm border transition-all duration-300 ${
      isCompleted
        ? "border-green-200"
        : isActive
        ? "border-blue-200"
        : "border-gray-100"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
          isCompleted
            ? "bg-green-100"
            : isActive
            ? "bg-blue-100"
            : "bg-gray-100"
        }`}
      >
        {isCompleted ? (
          <CheckCircle className="w-6 h-6 text-green-600" />
        ) : (
          <Icon
            className={`w-6 h-6 ${
              isActive ? "text-blue-600" : "text-gray-400"
            }`}
          />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          {description}
        </p>
        {actionButton}
      </div>
    </div>
  </div>
);

const AddressDisplay = ({ address }: { address: any }) => {
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    const start = addr.slice(0, 5);
    const end = addr.slice(-10);
    return `${start}...${end}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="bg-gray-50 rounded-lg p-4 w-full max-w-sm flex items-center justify-between gap-2">
        <div className="font-mono text-sm text-gray-700">
          {formatAddress(address)}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
          aria-label="Copy address"
        >
          {copied ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600 group-hover:text-gray-800 hover:cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default function VerifyPage() {
  const [entered, setEntered] = useState(false);
  const { data: session, status } = useSession();

  const {
    authMethod,
    loading: authLoading,
    error: authError,
  } = useAuthenticate(ORIGIN);

  const {
    createAccount,
    setCurrentAccount,
    currentAccount,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts();

  const {
    initSession,
    sessionSigs,
    loading: sessionLoading,
    error: sessionError,
  } = useSessionHook();

  useEffect(() => {
    const func = async () => {
      if (
        authMethod &&
        authMethod.authMethodType !==
          AuthMethodType.WebAuthn
      ) {
        const provider = litAuthClient.getProvider(
          ProviderType.Google
        );
        const pkps =
          await provider!.fetchPKPsThroughRelayer(
            authMethod
          );

        if (pkps.length === 0) {
          console.log("creating account");
          await createAccount(authMethod);
        } else {
          console.log("init session");
          await initSession(authMethod, pkps[0]);
        }
        setEntered(true);
      }
    };

    if (authMethod?.accessToken) {
      console.log("running");
      func();
    }
  }, [authMethod]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle(ORIGIN);
  };

  const isLoading =
    authLoading || accountsLoading || sessionLoading;

  if (session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Signed In Successfully
              </h2>
              <p className="text-gray-600 mb-4">
                <AddressDisplay
                  address={session.user?.name}
                />
              </p>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar pageType="app" />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Verify Your Identity
          </h1>
          <p className="text-gray-600 text-center mb-12 text-sm md:text-base">
            Complete these verification steps to activate
            your Web3 debit card
          </p>

          <div className="space-y-4">
            {/* Google Sign In Step */}
            <VerificationStep
              title="Sign in with Google"
              description="Connect your Google account to begin the verification process"
              icon={Mail}
              isCompleted={entered}
              isActive={!entered}
              actionButton={
                !entered && (
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm md:text-base">
                          Connecting...
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span className="text-sm md:text-base">
                          Sign in with Google
                        </span>
                      </>
                    )}
                  </button>
                )
              }
            />

            {/* World ID Verification Step */}
            <VerificationStep
              title="World ID Verification"
              description="Verify your identity using World ID's secure protocol"
              icon={Shield}
              isCompleted={false}
              isActive={entered}
              actionButton={
                entered && (
                  <button
                    onClick={() => signIn("worldcoin")}
                    disabled={isLoading}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm md:text-base">
                          Verifying...
                        </span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span className="text-sm md:text-base">
                          Verify with World ID
                        </span>
                      </>
                    )}
                  </button>
                )
              }
            />
          </div>
          {/* 
          {(authError || accountsError || sessionError) && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {authError || accountsError || sessionError}
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
}
