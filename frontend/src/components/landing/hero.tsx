"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import carImg from "../../assets/bmw_home.png"
import { useEffect, useRef, useState } from "react";
function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height

        const progress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight * 0.5)))
        setScrollY(progress)
      }
    }

    const handleResize = () => {
      // Tailwind's 'lg' breakpoint is 1024px
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    handleScroll() // Initial call
    handleResize() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  
  const textOpacity = isLargeScreen ? 1 - scrollY * 1.5 : 1 
  const textTransform = isLargeScreen ? `translateX(${-scrollY * 100}px) translateY(${scrollY * 50}px)` : "none"
  const imageTransform = isLargeScreen ? `translateX(${-scrollY * 300}px) scale(${1 + scrollY * 0.1})` : "none"

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-100 rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute top-40 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-float-medium"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-25 animate-float-fast"></div>
      <div className="absolute bottom-32 left-10 w-8 h-8 bg-orange-400 rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-orange-200 rounded-full opacity-15 animate-float-medium"></div>
      <div className="absolute top-10 left-1/2 w-10 h-10 bg-orange-300 rounded-full opacity-30 animate-float-fast"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div
          style={{
            opacity: textOpacity,
            transform: textTransform,
            transition: "none", 
          }}
        >
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-6">🚀 Powered by AI & Web3</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Rent Cars with
            <span className="text-orange-500"> AI-Powered</span>
            <br />
            Recommendations
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the future of car rental with AutoChain. Our AI finds the perfect vehicle for your needs while
            blockchain technology ensures secure, transparent transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
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

        <div
          className="relative"
          style={{
            transform: imageTransform,
            transition: "none",
          }}
        >
          <img
            src={carImg.src}
            alt="AutoChain AI Car"
            className="w-full h-auto rounded-lg"
          />
          <div
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border"
            style={{
              opacity: textOpacity, 
              transform: `scale(${1 - scrollY * 0.2})`, 
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">AI Matching Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Hero;
