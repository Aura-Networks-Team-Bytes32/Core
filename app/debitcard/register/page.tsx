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
import { backendBaseURL } from "@/utils/backend";
import { litNodeClient } from "@/utils/lit";
import {
  LitAbility,
  LitActionResource,
  LitPKPResource,
} from "@lit-protocol/auth-helpers";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
// import { litActionCode } from "@/utils/litAction";

export default function RegisterPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    console.log(email);
  }, [email]);
  const handleOtpChange = (index: number, value: string) => {
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
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
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

    const message = new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode("Pay with Aura Networks")
      )
    );
    const pkp = getPKPFromStorage();
    console.log(pkp, "pkp");

    // await fetch(`${backendBaseURL}/auth/verify-otp`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     otp: otpValue,
    //   }),
    // })
    //   .then((response) => response.status)
    //   .then((data) => {
    //     console.log("otp verified:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error Sending Email:", error);
    //   });
    // const litActionCode = `
    // (async () => {
    //   const sigShare = await LitActions.signEcdsa({
    //     toSign,
    //     publicKey,
    //     sigName,
    //   });
    // })();
    // `;
    // const sessionSignatures = await litNodeClient.getLitActionSessionSigs({
    //   pkpPublicKey: pkp!.publicKey,

    //   chain: "ethereum",
    //   resourceAbilityRequests: [
    //     {
    //       resource: new LitPKPResource("*"),
    //       ability: LitAbility.PKPSigning,
    //     },
    //     {
    //       resource: new LitActionResource("*"),
    //       ability: LitAbility.LitActionExecution,
    //     },
    //   ],
    //   // With this setup you could use either the litActionIpfsId or the litActionCode property
    //   //litActionIpfsId: litActionCodeIpfsCid,

    //   litActionCode: Buffer.from(litActionCode).toString("base64"),
    //   jsParams: {
    //     toSign: message,
    //     publicKey: pkp!.publicKey,
    //     sigName: "sig1",
    //   },
    // });
    // console.log(sessionSignatures)

    // const signatures = await litNodeClient.executeJs({
    //   code: litActionCode,
    //   sessionSigs: sessionSignatures,
    //   // all jsParams can be used anywhere in your litActionCode
    //   jsParams: {
    //     toSign: message,
    //     publicKey: pkp!.publicKey,
    //     sigName: "sig1",
    //   },
    // });

    // console.log("signatures: ", JSON.stringify(signatures));
     
    await fetch(`${backendBaseURL}/auth/register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        worldIdHash: ethers.keccak256(ethers.toUtf8Bytes("input")),
        debitCardHash: ethers.keccak256(ethers.toUtf8Bytes("hello world")),
        pkpPublicKey: pkp?.publicKey,
        userEOA: pkp?.ethAddress,
      }),
    })
      .then((response) => response.status)
      .then((data) => {
        console.log("verified and good to go");
      })
      .catch((error) => {
        console.error("Error Sending Email:", error);
      });

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
              Enter the 6-digit verification code sent to your email.
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
                  onChange={(e) => handleOtpChange(index, e.target.value)}
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
