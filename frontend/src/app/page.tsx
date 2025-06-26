"use client";

import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gavel } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect } from "react";
// import AnimatedNumbers from "react-animated-numbers"
import CountUp from 'react-countup';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  
  useEffect(() => {
    new LocomotiveScroll();
  })

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <main data-scroll data-scroll-speed="0.5" className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
                🚀 Powered by Blockchain Technology
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                The Future of{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Decentralized
                </span>{" "}
                Auctions
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience transparent, secure, and trustless auctions on the blockchain. Buy and sell digital assets
                with complete ownership and zero intermediaries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start Bidding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                  Create Auction
                  <Gavel className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {/* <div className="text-center">
                  <CountUp
                    start={0}
                    end={2400}
                    suffix="+"
                    className="text-2xl font-bold text-gray-900"
                  />
                  <div className="text-sm text-gray-600">Total Volume</div>
                </div> */}
                <div className="text-center">
                  <CountUp
                    start={0}
                    end={100}
                    suffix="+"
                    className="text-2xl font-bold text-gray-900"
                  />
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <CountUp
                    start={0}
                    end={850}
                    suffix="+"
                    className="text-2xl font-bold text-gray-900"
                  />
                  <div className="text-sm text-gray-600">Auctions</div>
                </div>
                <div className="text-center">
                  <CountUp
                    start={0}
                    end={99}
                    suffix="%"
                    className="text-2xl font-bold text-gray-900"
                  />
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
