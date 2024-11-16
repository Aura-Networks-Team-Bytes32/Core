import {
  DiscordProvider,
  GoogleProvider,
  EthWalletProvider,
  WebAuthnProvider,
  LitAuthClient,
  BaseProvider,
} from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import {
  AuthMethodScope,
  AuthMethodType,
  LIT_NETWORK,
  ProviderType,
} from "@lit-protocol/constants";
import {
  AuthMethod,
  GetSessionSigsProps,
  IRelayPKP,
  SessionSigs,
  AuthCallbackParams,
  LitAbility,
  LIT_NETWORKS_KEYS,
} from "@lit-protocol/types";
import { LitPKPResource } from "@lit-protocol/auth-helpers";

export const SELECTED_LIT_NETWORK = ((process.env
  .NEXT_PUBLIC_LIT_NETWORK as string) ||
  LIT_NETWORK.DatilDev) as LIT_NETWORKS_KEYS;

export const litNodeClient: LitNodeClient =
  new LitNodeClient({
    alertWhenUnauthorized: false,
    litNetwork: SELECTED_LIT_NETWORK,
    debug: true,
  });

litNodeClient.connect();

export const litAuthClient: LitAuthClient =
  new LitAuthClient({
    litRelayConfig: {
      relayApiKey:
        "gt45zdfp-ct3a-lgn5-la3c-1c4dkazbto54_bytes",
    },
    litNodeClient,
  });

const DOMAIN =
  process.env.NEXT_PUBLIC_DOMAIN || "localhost";
export const ORIGIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${DOMAIN}`
    : `http://${DOMAIN}:3000/debitcard/onboard`;

export async function signInWithGoogle(
  redirectUri: string
): Promise<void> {
  const googleProvider =
    litAuthClient.initProvider<GoogleProvider>(
      ProviderType.Google,
      { redirectUri }
    );
  await googleProvider.signIn();
}

export async function getPKPs(
  authMethod: AuthMethod
): Promise<IRelayPKP[]> {
  const provider = getProviderByAuthMethod(authMethod);
  //undefined error only
  const allPKPs = await provider!.fetchPKPsThroughRelayer(
    authMethod
  );
  return allPKPs;
}

export async function mintPKP(
  authMethod: AuthMethod
): Promise<IRelayPKP[]> {
  const provider = getProviderByAuthMethod(authMethod);

  if (authMethod.accessToken != "") {
    // -- setting scope for the auth method
    // <https://developer.litprotocol.com/v3/sdk/wallets/auth-methods/#auth-method-scopes>
    const options = {
      permittedAuthMethodScopes: [
        [AuthMethodScope.SignAnything],
      ],
    };
    await provider!.mintPKPThroughRelayer(
      authMethod,
      options
    );
    const pkps = await provider!.fetchPKPsThroughRelayer(
      authMethod
    );
    return pkps;
  }
}

export async function getSessionSigs({
  pkpPublicKey,
  authMethod,
  sessionSigsParams,
}: {
  pkpPublicKey: string;
  authMethod: AuthMethod;
  sessionSigsParams: GetSessionSigsProps;
}): Promise<SessionSigs> {
  const provider = getProviderByAuthMethod(authMethod);
  if (provider) {
    await litNodeClient.connect();
    const sessionSigs =
      await litNodeClient.getPkpSessionSigs({
        pkpPublicKey,
        authMethods: [authMethod],
        resourceAbilityRequests: [
          {
            resource: new LitPKPResource("*"),
            ability: LitAbility.PKPSigning,
          },
        ],
      });

    return sessionSigs;
  } else {
    throw new Error(
      `Provider not found for auth method type ${authMethod.authMethodType}`
    );
  }
}

/**
 * Get provider for given auth method
 */
function getProviderByAuthMethod(authMethod: AuthMethod) {
  switch (authMethod.authMethodType) {
    case AuthMethodType.GoogleJwt:
      return litAuthClient.getProvider(ProviderType.Google);
    case AuthMethodType.Discord:
      return litAuthClient.getProvider(
        ProviderType.Discord
      );
    case AuthMethodType.EthWallet:
      return litAuthClient.getProvider(
        ProviderType.EthWallet
      );
    case AuthMethodType.WebAuthn:
      return litAuthClient.getProvider(
        ProviderType.WebAuthn
      );
    case AuthMethodType.StytchEmailFactorOtp:
      return litAuthClient.getProvider(
        ProviderType.StytchEmailFactorOtp
      );
    case AuthMethodType.StytchSmsFactorOtp:
      return litAuthClient.getProvider(
        ProviderType.StytchSmsFactorOtp
      );
    default:
      return;
  }
}

export async function authenticateWithGoogle(
  redirectUri: string
): Promise<AuthMethod | undefined> {
  const googleProvider =
    litAuthClient.initProvider<GoogleProvider>(
      ProviderType.Google,
      { redirectUri }
    );
  const authMethod = await googleProvider.authenticate();
  return authMethod;
}
