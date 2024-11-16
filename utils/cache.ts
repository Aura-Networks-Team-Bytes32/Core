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
  }
};

export const getCardDetails = () => {
  if (typeof window !== "undefined") {
    const details = localStorage.getItem("cardDetails");
    return details ? JSON.parse(details) : null;
  }
  return null;
};
