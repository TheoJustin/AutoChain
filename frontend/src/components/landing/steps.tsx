import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Steps() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">
            🔄 How It Works
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Complete Rental Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From minting CarNFTs to automated rental expiration, experience a
            fully decentralized car sharing ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">1</span>
              </div>
              <CardTitle className="text-gray-800">
                Owner Mints CarNFT
              </CardTitle>
              <CardDescription className="text-gray-600">
                Vehicle owners register their cars on-chain as unique CarNFTs
                (ERC-721) containing metadata like car details, rental rules,
                and access policies.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">2</span>
              </div>
              <CardTitle className="text-gray-800">
                AI-Powered Browsing
              </CardTitle>
              <CardDescription className="text-gray-600">
                Renters connect their wallet and receive personalized car
                suggestions using AI that considers preferences, location, trip
                purpose, and availability.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">3</span>
              </div>
              <CardTitle className="text-gray-800">
                Smart Contract Rental
              </CardTitle>
              <CardDescription className="text-gray-600">
                When a renter selects a car, a smart contract is triggered,
                defining rental period, payment, and usage terms. The NFT
                temporarily grants access rights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">4</span>
              </div>
              <CardTitle className="text-gray-800">
                NFT-Based Vehicle Access
              </CardTitle>
              <CardDescription className="text-gray-600">
                The car can only be unlocked by the wallet holding the active
                rental NFT. With IoT integration, the vehicle verifies the
                wallet address before ignition.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">5</span>
              </div>
              <CardTitle className="text-gray-800">Auto-Expiration</CardTitle>
              <CardDescription className="text-gray-600">
                After the rental period ends, the smart contract automatically
                revokes access and the CarNFT returns full control to the owner.
                No manual intervention required.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow py-5">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">6</span>
              </div>
              <CardTitle className="text-gray-800">
                On-Chain Reputation
              </CardTitle>
              <CardDescription className="text-gray-600">
                Both renter and owner build verifiable on-chain reputation
                through ratings, timely returns, and rental history—enhancing
                trust for future interactions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Steps;
