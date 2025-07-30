import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function CTA() {

    return (
        <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Ready to Experience the Future of Car Rental?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust AutoChain for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Start Renting Now
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
      </section>
    );
}

export default CTA;