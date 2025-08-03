"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect } from "react";
import Hero from "@/components/landing/hero";
import AIFeatures from "@/components/landing/features";
import MainFeatures from "@/components/landing/mainfeatures";
import CTA from "@/components/landing/cta";
import Stats from "@/components/landing/stats";
import Steps from "@/components/landing/steps";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  
  useEffect(() => {
    new LocomotiveScroll();
  })

  return (
    <>
      <main>
        <Hero />
        <Steps />
        <AIFeatures />
        <MainFeatures />
        <Stats />
        <CTA />
      </main>
    </>
  );
}

export default App;
