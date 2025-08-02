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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Wallet</h1>
          <p className="text-gray-600">Please connect your wallet to view and rent out your minted cars.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Rent Out Your Cars
          </h1>
          <p className="text-gray-600">
            List your minted car NFTs for rent and earn passive income
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Minted Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mintedCars.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available for Rent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mintedCars.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Potential Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ${mintedCars.reduce((sum, car) => sum + car.price, 0)}/day
              </div>
            </CardContent>
          </Card>
        </div>

        {mintedCars.length > 0 ? (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  My Cars Available for Rent
                </h2>
                <p className="text-gray-600">Set rental prices for your minted car NFTs</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {mintedCars.length} Cars
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mintedCars.map((car) => (
                <Card
                  key={car.tokenId}
                  className="pb-5 group hover:shadow-xl transition-all duration-300 border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                >
                  <div className="relative">
                    <Image
                      src={imgLink || '/placeholder.svg'}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
                      🏆 My NFT
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white text-xs">
                      Token #{car.tokenId}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-gray-800 mb-1 truncate">
                          {car.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {car.manufacturer}
                          </Badge>
                          <span className="shrink-0">{car.year}</span>
                          <span className="shrink-0">•</span>
                          <span className="shrink-0">{car.type}</span>
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

                    <div className="flex flex-wrap gap-1 mb-4">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <Label htmlFor={`price-${car.tokenId}`} className="text-sm font-medium">
                          Set Rental Price (ETH/day)
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id={`price-${car.tokenId}`}
                          type="number"
                          step="0.001"
                          placeholder="0.01"
                          value={listingPrices[car.tokenId] || ''}
                          onChange={(e) => handlePriceChange(car.tokenId, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleListCar(car.tokenId)}
                          disabled={!listingPrices[car.tokenId] || isListing[car.tokenId]}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          {isListing[car.tokenId] ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Listing...
                            </div>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              List
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Your car will be available for others to rent once listed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12">
            <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Minted Cars Yet</h2>
            <p className="text-gray-600 mb-6">
              You need to mint car NFTs before you can list them for rent.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Go to Cars Page to Mint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}