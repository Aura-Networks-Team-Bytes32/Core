"use client";
import useAccounts from "@/hooks/useAccounts";
import useAuthenticate from "@/hooks/useAuthenticate";
import useSessionHook from "@/hooks/useSession";
import { ORIGIN, litAuthClient, signInWithGoogle } from "@/utils/lit";
import { AuthMethodType, ProviderType } from "@lit-protocol/constants";

import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  async function handleGoogleLogin() {
    await signInWithGoogle(ORIGIN);
  }
  const { data: session, status } = useSession();

  const [entered, SetEntered] = useState(false);

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
    // If user is authenticated, create an account
    // For WebAuthn, the account creation is handled by the registerWithWebAuthn function
    const func = async () => {
      console.log("running");
      if (authMethod && authMethod.authMethodType !== AuthMethodType.WebAuthn) {
        const provider = litAuthClient.getProvider(ProviderType.Google);
        const pkps = await provider!.fetchPKPsThroughRelayer(authMethod);
        console.log(pkps);
        if (pkps.length === 0) {
          console.log("creating account");
          await createAccount(authMethod);
        } else {
          console.log("init session");
          await initSession(authMethod, pkps[0]);
        }
        SetEntered(true);
      }
    };
    console.log(authMethod?.accessToken);
    func();
  }, [authMethod]);

  if (session) {
    return (
      <>
        Signed in as {session.user?.email ?? session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div>
      {!entered && <button onClick={handleGoogleLogin}>Gmail SingIn</button>}
      {entered && (
        <button onClick={() => signIn("worldcoin")}>
          Sign in using Worldcoin
        </button>
      )}
    </div>
  );
}
