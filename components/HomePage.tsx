import React from "react";
import {
  ArrowRight,
  Shield,
  Wallet,
  CreditCard,
  Zap,
  Users,
  LucideLock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "./Navbar";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Interfaces
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

interface TechCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface TeamCardProps {
  github: string;
  twitter: string;
  name: string;
}

// Components
const AnimatedCard: React.FC = () => (
  <div className="relative w-72 h-44 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl transform rotate-6 transition-all hover:rotate-12">
    <div className="absolute inset-0 w-full h-full bg-black/10 rounded-xl" />
    <div className="absolute top-4 left-4 right-4">
      <div className="h-4 w-12 bg-yellow-400 rounded-md mb-4" />
      <div className="space-y-2">
        <div className="h-2 w-32 bg-white/60 rounded" />
        <div className="h-2 w-24 bg-white/60 rounded" />
      </div>
    </div>
    <div className="absolute bottom-4 right-4">
      <div className="flex gap-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-3 w-3 bg-white/60 rounded-full"
          />
        ))}
      </div>
    </div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
}) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TechCard: React.FC<TechCardProps> = ({
  icon,
  name,
  description,
}) => (
  <div className="bg-white p-6 rounded-xl text-center border hover:shadow-sm transition-shadow">
    <div className="mb-3 flex justify-center text-gray-800">
      {icon}
    </div>
    <h3 className="font-bold mb-1 text-gray-800">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const TeamCard: React.FC<TeamCardProps> = ({
  github,
  twitter,
  name,
}) => (
  <ul className="text-gray-400 flex items-center justify-start gap-3">
    <div className="flex items-center gap-3">
      <Link
        href={`https://github.com/${github}`}
        target="_blank"
        className="text-gray-400 hover:text-gray-300"
      >
        <FaGithub />
      </Link>
      <Link
        href={`https://x.com/${twitter}`}
        target="_blank"
        className="text-gray-400 hover:text-gray-300"
      >
        <FaXTwitter />
      </Link>
    </div>
    <p className="text-sm sm:text-base">{name}</p>
  </ul>
);

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar pageType="home" />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The Next Generation of Digital Payments
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">
                Seamlessly bridge traditional banking with
                blockchain technology. Your familiar debit
                card experience, powered by cutting-edge
                security.
              </p>
              <div className="flex gap-4 sm:gap-6">
                <button className="bg-blue-600 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base">
                  Get Started{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 -left-4 w-72 h-44 bg-blue-600 rounded-xl transform -rotate-6 opacity-20 blur-xl animate-pulse" />
              <div className="relative">
                <AnimatedCard />
                <div className="absolute top-20 -right-1">
                  <AnimatedCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            <FeatureCard
              icon={
                <Shield className="w-8 h-8 text-blue-600" />
              }
              title="Enhanced Security"
              description="Protected by Lit Protocol PKP and WorldCoin proof-of-personhood verification"
            />
            <FeatureCard
              icon={
                <Wallet className="w-8 h-8 text-blue-600" />
              }
              title="Smart Contract Powered"
              description="Efficient fund management through smart contracts with instant settlements"
            />
            <FeatureCard
              icon={
                <CreditCard className="w-8 h-8 text-blue-600" />
              }
              title="Familiar Experience"
              description="Use it just like your regular debit card with OTP authentication"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            <StepCard
              number="1"
              title="Create Account"
              description="Sign up with your Gmail and verify your identity through WorldCoin"
            />
            <StepCard
              number="2"
              title="On Ramp Fiat"
              description="Move your fiat to crypto"
            />
            <StepCard
              number="3"
              title="Start Using"
              description="Make payments anywhere with the security of blockchain technology"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-gray-800">
            Powered By
          </h2>
          <div className="grid md:grid-cols-4 gap-5 sm:gap-8">
            <TechCard
              icon={<LucideLock className="w-6 h-6" />}
              name="Lit Protocol"
              description="Secure PKP Authentication"
            />
            <TechCard
              icon={<Users className="w-6 h-6" />}
              name="WorldCoin"
              description="Proof-of-Personhood"
            />
            <TechCard
              icon={<Zap className="w-6 h-6" />}
              name="Polygon"
              description="Fast & Low-fee Network"
            />
            <TechCard
              icon={<Shield className="w-6 h-6" />}
              name="Blockless"
              description="Transaction Security"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                AuraNetworks
              </h3>
              <p className="text-gray-400">
                Next-gen payment solution bridging
                traditional finance with blockchain
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Team</h4>
              <TeamCard
                github="Anmol-Dhiman"
                twitter="SherlockVarm"
                name="Anmol Dhiman"
              />
              <TeamCard
                github="Harsh-Vardhan-Singh-Shekhawat"
                twitter="hshekhawat7773"
                name="Harsh Vardhan Singh Shekhawat"
              />
              <TeamCard
                github="nishantt19"
                twitter="_nishantt19"
                name="Nishant"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
