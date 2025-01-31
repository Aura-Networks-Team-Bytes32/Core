// src/app/debitcard/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Mail, Shield, Loader2, CheckCircle } from "lucide-react";
import useAccounts from "@/hooks/useAccounts";
import useAuthenticate from "@/hooks/useAuthenticate";
import useSessionHook from "@/hooks/useSession";
import { ORIGIN, litAuthClient, signInWithGoogle } from "@/utils/lit";
import { AuthMethodType, ProviderType } from "@lit-protocol/constants";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  setPKPToStorage,
  removeAccountType,
  setUserDetails,
} from "@/utils/cache";
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
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm md:text-base">{description}</p>
        {actionButton}
      </div>
    </div>
  </div>
);

export default function VerifyPage() {
  const [entered, setEntered] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
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
      if (authMethod && authMethod.authMethodType !== AuthMethodType.WebAuthn) {
        const provider = litAuthClient.getProvider(ProviderType.Google);
        const pkps = await provider!.fetchPKPsThroughRelayer(authMethod);

        if (pkps.length === 0) {
          console.log("creating account");
          await createAccount(authMethod);
        } else {
          console.log("init session");
          await initSession(authMethod, pkps[0]);
          removeAccountType();
          setPKPToStorage(pkps[0]);
        }
        setEntered(true);
      }
    };

    if (authMethod?.accessToken) {
      console.log("running");
      func();
    }
  }, [authMethod]);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (session && !shouldRedirect) {
      setUserDetails(session.user?.name || "");
      setShouldRedirect(true);

      // Delay the redirect to show the toast
      setTimeout(() => {
        router.push("/debitcard/dashboard");
      }, 2000);
    }
  }, [session, shouldRedirect, router]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle(ORIGIN);
  };

  const isLoading = authLoading || accountsLoading || sessionLoading;

  if (session) {
    toast.success("Sign up successful!", {
      description: "Redirecting to dashboard...",
    });
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Toaster richColors position="top-right" visibleToasts={1} />
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
            Complete these verification steps to activate your Web3 debit card
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
