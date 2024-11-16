import { IRelayPKP } from "@lit-protocol/types";
import hashCardDetails from "./cardHash";

export const setCardDetails = (cardDetails: {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "cardDetails",
      JSON.stringify(cardDetails)
    );
    localStorage.setItem(
      "cardHash",
      hashCardDetails(cardDetails)
    );
  }
};

export const setUserDetails = (worldId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("worldId", worldId);
  }
};

export const setMerchantToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("merchantToken", token);
  }
};

export const getMerchantToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("merchantToken");
  }
  return null;
};
export const getUserDetails = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("worldId");
  }
  return null;
};

export const getCardDetails = () => {
  if (typeof window !== "undefined") {
    const details = localStorage.getItem("cardDetails");
    return details ? JSON.parse(details) : null;
  }
  return null;
};

export const getCardHash = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("cardHash");
  }
  return null;
};

export const PKP_STORAGE_KEY = "pkp";
export const ACCOUNT_TYPE_KEY = "accountType";

export const setPKPToStorage = (pkp: IRelayPKP) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PKP_STORAGE_KEY,
        JSON.stringify(pkp)
      );
    }
  } catch (error) {
    console.error("Error saving PKP to storage:", error);
  }
};

export const setAccountType = (type: "new" | null) => {
  try {
    if (typeof window !== "undefined") {
      if (type === null) {
        localStorage.removeItem(ACCOUNT_TYPE_KEY);
      } else {
        localStorage.setItem(ACCOUNT_TYPE_KEY, type);
      }
    }
  } catch (error) {
    console.error("Error saving account type:", error);
  }
};

export const getPKPFromStorage = (): IRelayPKP | null => {
  try {
    if (typeof window !== "undefined") {
      const storedPKP =
        localStorage.getItem(PKP_STORAGE_KEY);
      return storedPKP ? JSON.parse(storedPKP) : null;
    }
    return null;
  } catch (error) {
    console.error("Error getting PKP from storage:", error);
    return null;
  }
};

export const getAccountType = (): string | null => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCOUNT_TYPE_KEY);
    }
    return null;
  } catch (error) {
    console.error("Error getting account type:", error);
    return null;
  }
};

export const removeAccountType = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCOUNT_TYPE_KEY);
    }
  } catch (error) {
    console.error("Error removing account type:", error);
  }
};
