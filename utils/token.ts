export const generateRandomToken = (): string => {
  const firstDigit = Math.floor(Math.random() * 9) + 1; // 1-9

  // Generate remaining 15 digits
  let remainingDigits = "";
  for (let i = 0; i < 15; i++) {
    remainingDigits += Math.floor(Math.random() * 10);
  }

  return `${firstDigit}${remainingDigits}`;
};
