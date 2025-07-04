import { Button } from "@/components/ui/button";
import { Gavel, Wallet } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Gavel className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            DeAuction
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            className="text-sm font-medium hover:text-purple-600 transition-colors"
          >
            Auctions
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-purple-600 transition-colors"
          >
            Create
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-purple-600 transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-purple-600 transition-colors"
          >
            About
          </Link>
        </nav>

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
          <Button className="ml-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Launch App
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
