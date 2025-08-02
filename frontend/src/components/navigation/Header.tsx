import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { Car } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">AutoChain</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/cars"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Cars
            </Link>
            <Link
              href="/rent"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Rent Out
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton
              label="Connect Wallet"
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
            <Button
              variant="outline"
              className="ml-6 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
