// src/app/merchant/verify/page.tsx
"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useAccounts from "@/hooks/useAccounts";
import useAuthenticate from "@/hooks/useAuthenticate";
import useSessionHook from "@/hooks/useSession";
import {
  MERCHANT_ORIGIN,
  litAuthClient,
  signInWithGoogle,
} from "@/utils/lit";
import {
  AuthMethodType,
  ProviderType,
} from "@lit-protocol/constants";
import Navbar from "@/components/Navbar";
import { Toaster, toast } from "sonner";
import {
  removeAccountType,
  setPKPToStorage,
} from "@/utils/cache";

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

export default function MerchantVerifyPage() {
  const [entered, setEntered] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] =
    useState(false);

  const {
    authMethod,
    loading: authLoading,
    error: authError,
  } = useAuthenticate(MERCHANT_ORIGIN);

  const {
    createAccount,
    setCurrentAccount,
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
          console.log("creating merchant account");
          await createAccount(authMethod);
        } else {
          console.log("init merchant session");
          await initSession(authMethod, pkps[0]);
          removeAccountType();
          setPKPToStorage(pkps[0]);
        }
        setEntered(true);
      }
    };

    if (authMethod?.accessToken) {
      func();
    }
  }, [authMethod]);

  useEffect(() => {
    if (authMethod && !shouldRedirect) {
      setShouldRedirect(true);
      toast.success("Merchant verification successful!", {
        description:
          "Setting up your merchant dashboard...",
      });
      setTimeout(() => {
        router.push("/merchant/dashboard");
      }, 2000);
    }
  }, [authMethod, shouldRedirect, router]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle(MERCHANT_ORIGIN);
  };

  const isLoading =
    authLoading || accountsLoading || sessionLoading;

  if (authMethod) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Toaster
          richColors
          position="top-right"
          visibleToasts={1}
        />
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Verification Complete
              </h2>
              <p className="text-gray-600 mb-2">
                Successfully verified merchant account
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to merchant dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar pageType="merchant" />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Verify Merchant Account
          </h1>
          <p className="text-gray-600 text-center mb-12 text-sm md:text-base">
            Complete the verification process to start
            accepting payments on your platform
          </p>

          <div className="space-y-4">
            <VerificationStep
              title="Sign in with Google"
              description="Verify your business email to secure your merchant account"
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
                          Verifying...
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span className="text-sm md:text-base">
                          Verify with Google
                        </span>
                      </>
                    )}
                  </button>
                )
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
