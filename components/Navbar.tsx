// src/components/Navbar.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LogOut,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  pageType:
    | "app"
    | "debitcard"
    | "creditcard"
    | "fdcard"
    | "home"
    | "cards";
}

const Navbar = ({ pageType }: NavbarProps) => {
  const { status } = useSession();
  const pathname = usePathname();

  // Check if we're in the debit card section
  const isDebitCardSection =
    pathname.includes("/debitcard");

  // Show sign out only if authenticated and in debit card section
  const showSignOut =
    status === "authenticated" && isDebitCardSection;

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">AuraNetworks</Link>
        </div>
        {pageType === "home" && (
          <Link href={"/app"}>
            <button className="bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Go to App <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        )}
        {pageType === "cards" && (
          <Link
            href="/app"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cards
          </Link>
        )}
        {showSignOut && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign out</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
