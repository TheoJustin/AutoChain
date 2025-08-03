import { Car, Clock, Shield, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function MainFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">
            ⚡ Core Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Complete Web3 Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From minting CarNFTs to automated smart contract rentals, AutoChain
            provides a complete decentralized car sharing platform.
          </p>
        </div>

        <div className="grid items-center justify-center">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    CarNFT Minting & Ownership
                  </h3>
                  <p className="text-gray-600">
                    Mint your vehicle as a unique CarNFT (ERC-721) with embedded
                    metadata including car details, rental rules, and access
                    policies stored permanently on-chain.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Smart Contract Automation
                  </h3>
                  <p className="text-gray-600">
                    Rental agreements are executed via smart contracts that
                    automatically handle payments, access rights, rental
                    periods, and expiration without manual intervention.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Automated Access Control
                  </h3>
                  <p className="text-gray-600">
                    NFT-based vehicle access ensures only the wallet holding the
                    active rental NFT can unlock and operate the vehicle, with
                    automatic expiration and access revocation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    On-Chain Reputation System
                  </h3>
                  <p className="text-gray-600">
                    Build verifiable reputation through on-chain ratings, timely
                    returns, and rental history that creates trust and enhances
                    future rental opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainFeatures;
