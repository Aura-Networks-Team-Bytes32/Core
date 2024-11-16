"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { getPKPFromStorage } from "@/utils/cache";

export default function RegisterPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (
    index: number,
    value: string
  ) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  useEffect(() => {
    const pkp = getPKPFromStorage();
    if (pkp) {
      //   window.location.href = "/debitcard/dashboard";
      console.log(pkp);
    }
  }, []);

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      const prevInput = document.querySelector(
        `input[name=otp-${index - 1}]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    console.log("OTP:", otpValue);
    // Add your verification logic here
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar pageType="debitcard" />

      <div className="flex items-start justify-center min-h-screen bg-gray-50 p-4 pt-24">
        <Card className="w-full max-w-md border border-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Complete Registration
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit verification code sent to
              your email.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center gap-2 sm:gap-4">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  name={`otp-${index}`}
                  className="w-10 h-10 text-center text-lg font-medium sm:w-12 sm:h-12 focus:border-blue-600 focus:ring-blue-600"
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                />
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
