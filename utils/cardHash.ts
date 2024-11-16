import { createHash } from "crypto";

export default function hashCardDetails(cardDetails: { cardNumber: string; expirationDate: string; cvv: string }): string {
    const dataToHash = `${cardDetails.cardNumber}|${cardDetails.expirationDate}|${cardDetails.cvv}`;
    const hash = createHash("sha256").update(dataToHash).digest("hex");
    return hash;
}