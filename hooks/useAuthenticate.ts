import { useCallback, useEffect, useState } from "react";
import {
  isSignInRedirect,
  getProviderFromUrl,
} from "@lit-protocol/lit-auth-client";
import { AuthMethod } from "@lit-protocol/types";
import { authenticateWithGoogle } from "../utils/lit";

export default function useAuthenticate(redirectUri?: string) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // wagmi hook

  /**
   * Handle redirect from Google OAuth
   */
  const authWithGoogle = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(undefined);
    setAuthMethod(undefined);

    try {
      const result: AuthMethod = (await authenticateWithGoogle(
        redirectUri as any
      )) as any;
      setAuthMethod(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [redirectUri]);

  /**
   * Handle redirect from Discord OAuth
   */

  /**
   * Authenticate with Ethereum wallet
   */

  useEffect(() => {
    // Check if user is redirected from social login
    if (redirectUri && isSignInRedirect(redirectUri)) {
      // If redirected, authenticate with social provider
      const providerName = getProviderFromUrl();

      authWithGoogle();
    }
  }, [redirectUri, authWithGoogle]);

  return {
    authMethod,
    loading,
    error,
  };
}
