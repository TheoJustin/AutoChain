import { Car, Shield, Zap } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function AIFeatures() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">
            🤖 AI-Powered Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Intelligent Car Recommendations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI analyzes your preferences and behavior to recommend
            the perfect vehicle for every journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="py-5">
              <Car className="h-12 w-12 text-orange-500 mb-4" />
              <CardTitle className="text-gray-800">
                Smart Recommendations
              </CardTitle>
              <CardDescription className="text-gray-600">
                AI analyzes your wallet history, location preferences, trip
                purpose, and past rental patterns to match you with the perfect
                car from our marketplace.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="py-5">
              <Shield className="h-12 w-12 text-orange-500 mb-4" />
              <CardTitle className="text-gray-800">Verified CarNFTs</CardTitle>
              <CardDescription className="text-gray-600">
                All cars are verified and contain authentic metadata stored
                on-chain as unique CarNFTs, ensuring platform quality and trust
                between owners and renters.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="py-5">
              <Zap className="h-12 w-12 text-orange-500 mb-4" />
              <CardTitle className="text-gray-800">Instant Matching</CardTitle>
              <CardDescription className="text-gray-600">
                Get personalized car recommendations instantly based on your
                on-chain rental history, verified preferences, and real-time
                availability.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AIFeatures;
