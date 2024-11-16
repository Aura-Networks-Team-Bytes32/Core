function generateCardNumber(prefix: string = "4", length: number = 16): string {
    const number: number[] = prefix.split("").map(Number);
    while (number.length < length - 1) {
        number.push(Math.floor(Math.random() * 10));
    }

    // Calculate Luhn checksum digit
    const checksum = calculateLuhnChecksum(number);
    number.push(checksum);

    return number.join("");
}

function calculateLuhnChecksum(cardNumber: number[]): number {
    const reversedDigits = cardNumber.slice().reverse();
    const sum = reversedDigits.reduce((total, digit, idx) => {
        if (idx % 2 === 0) {
            // Double every second digit
            digit *= 2;
            if (digit > 9) {
                digit -= 9; // Subtract 9 if the result is greater than 9
            }
        }
        return total + digit;
    }, 0);

    // Calculate the checksum digit
    return (10 - (sum % 10)) % 10;
}

export default function generateRandomDebitCard() {
    const cardNumber = generateCardNumber("4"); // You can use "4" for Visa, "5" for MasterCard, etc.
    const expirationMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const expirationYear = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2);
    const cvv = String(Math.floor(Math.random() * 900) + 100); // 3-digit CVV

    return {
        cardNumber,
        expirationDate: `${expirationMonth}/${expirationYear}`,
        cvv,
    };
}


