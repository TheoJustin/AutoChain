"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car, MapPin, Star, Plus, DollarSign } from "lucide-react"
import Image from "next/image"
import { useMintedCars } from '@/hooks/useMintedCars'
import { useCarNFT } from '@/hooks/useCarNFT'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import imgLink from "@/assets/cars/placeholder.jpg"
import { parseEther } from 'viem'

export default function RentPage() {
  const { isConnected } = useAccount();
  const { mintedCars } = useMintedCars();
  const { listCar } = useCarNFT();
  const [listingPrices, setListingPrices] = useState<{[key: number]: string}>({});
  const [isListing, setIsListing] = useState<{[key: number]: boolean}>({});
  
  const totalPotentialEarnings = mintedCars.reduce((sum, car) => {
    const price = listingPrices[car.tokenId] ? parseFloat(listingPrices[car.tokenId]) : 0.05;
    return sum + price;
  }, 0);

  const handleListCar = async (tokenId: number) => {
    const price = listingPrices[tokenId];
    if (!price || !isConnected) return;

    try {
      setIsListing(prev => ({ ...prev, [tokenId]: true }));
      const priceInWei = parseEther(price).toString();
      await listCar(tokenId, priceInWei);
      alert(`Car successfully listed for ${price} ETH/day! It's now available for rent.`);
      setListingPrices(prev => ({ ...prev, [tokenId]: '' }));
    } catch (error) {
      console.error('Failed to list car:', error);
      alert('Failed to list car. Make sure you own this NFT and have approved the rental contract.');
    } finally {
      setIsListing(prev => ({ ...prev, [tokenId]: false }));
    }
  };

  const handlePriceChange = (tokenId: number, price: string) => {
    setListingPrices(prev => ({ ...prev, [tokenId]: price }));
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-orange-100">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Car className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 max-w-md">
            Please connect your wallet to view and rent out your minted cars.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Rent Out Your Cars
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your minted car NFTs into passive income streams. Set your prices and start earning today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Car className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-sm font-medium text-blue-700">Total Minted Cars</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{mintedCars.length}</div>
              <p className="text-xs text-blue-500 mt-1">NFTs in your collection</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-sm font-medium text-green-700">Available for Rent</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{mintedCars.length}</div>
              <p className="text-xs text-green-500 mt-1">Ready to list</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-sm font-medium text-orange-700">Potential Earnings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {totalPotentialEarnings.toFixed(3)} ETH
              </div>
              <p className="text-xs text-orange-500 mt-1">per day potential</p>
            </CardContent>
          </Card>
        </div>

        {mintedCars.length > 0 ? (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  My Cars Available for Rent
                </h2>
                <p className="text-gray-600 text-lg">Set competitive rental prices for your minted car NFTs</p>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold">
                {mintedCars.length} Cars Ready
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mintedCars.map((car) => (
                <Card
                  key={car.tokenId}
                  className="pb-6 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 backdrop-blur-sm shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={imgLink || '/placeholder.svg'}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                      🏆 My NFT
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs shadow-lg">
                      #{car.tokenId}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-gray-800 mb-1 truncate">
                          {car.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs shrink-0 border-blue-200 text-blue-700">
                            {car.manufacturer}
                          </Badge>
                          <span className="shrink-0 font-medium">{car.year}</span>
                          <span className="shrink-0 text-blue-400">•</span>
                          <span className="shrink-0 font-medium">{car.type}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                          <span className="font-medium text-gray-800">
                            {car.rating}
                          </span>
                          <span className="text-gray-500 text-sm truncate">
                            ({car.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{car.fuel}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-2 py-1 rounded-full font-medium"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <DollarSign className="h-3 w-3 text-white" />
                        </div>
                        <Label htmlFor={`price-${car.tokenId}`} className="text-sm font-semibold text-gray-700">
                          Set Rental Price (ETH/day)
                        </Label>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <Input
                            id={`price-${car.tokenId}`}
                            type="number"
                            step="0.001"
                            placeholder="0.050"
                            value={listingPrices[car.tokenId] || ''}
                            onChange={(e) => handlePriceChange(car.tokenId, e.target.value)}
                            className="pl-8 border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl transition-all duration-300"
                          />
                          <DollarSign className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        
                        <Button
                          onClick={() => handleListCar(car.tokenId)}
                          disabled={!listingPrices[car.tokenId] || isListing[car.tokenId]}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6"
                        >
                          {isListing[car.tokenId] ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Listing...
                            </div>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              List Now
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-xl border border-green-100">
                        <p className="text-xs text-gray-600 text-center">
                          💡 <strong>Tip:</strong> Your car will be instantly available for rent once listed!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent mb-3">
              No Minted Cars Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Start your journey by minting car NFTs. Once minted, you can list them here for rent and earn passive income!
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl text-lg">
              🚗 Go to Cars Page to Mint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}