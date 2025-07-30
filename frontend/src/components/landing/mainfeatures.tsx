import { Car, Shield, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function MainFeatures() {
    return (
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">⚡ Core Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From renting to earning, AutoChain provides a complete ecosystem for car sharing powered by blockchain
              technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Car className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dual User Experience</h3>
                    <p className="text-gray-600">
                      Be a renter finding the perfect car or an owner earning from your vehicle. Switch roles
                      seamlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Blockchain Security</h3>
                    <p className="text-gray-600">
                      All transactions are secured by blockchain technology with MetaMask integration for wallet
                      management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Analytics</h3>
                    <p className="text-gray-600">
                      Track your rental history, earnings, and get insights to optimize your car sharing experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="AutoChain Dashboard"
                className="rounded-2xl shadow-2xl"
              />
            </div> */}
          </div>
        </div>
      </section>
    );
}

export default MainFeatures;