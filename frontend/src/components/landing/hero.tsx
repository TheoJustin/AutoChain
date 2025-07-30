import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-6">
              🚀 Powered by AI & Web3
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Rent Cars with
              <span className="text-orange-500"> AI-Powered</span>
              <br />
              Recommendations
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of car rental with AutoChain. Our AI finds
              the perfect vehicle for your needs while blockchain technology
              ensures secure, transparent transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Start Renting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                List Your Car
              </Button>
            </div>
          </div>
          {/* <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="AutoChain AI Interface"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-800">
                  AI Matching Active
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
