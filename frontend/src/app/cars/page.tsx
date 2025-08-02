"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, MapPin, Star, Filter, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cars } from "@/data/cars"
import imgLink from "@/assets/cars/placeholder.jpg"
import Image from "next/image"
import { getRecommendationsByFeatures } from "@/services/car.service"
import { useEffect, useState } from "react"
import { MintCarModal } from '@/components/MintCarModal'
import { useMintedCars } from '@/hooks/useMintedCars'
import { useAccount } from 'wagmi'

interface AICar {
  id: number;
  name: string;
  manufacturer: string;
  year: string;
  type: string;
  fuel: string;
  transmission: string;
  condition: string;
  price: number;
  image_url: string;
  lat: number;
  long: number;
  features: string;
  price_range: string;
  location?: string;
  rating?: number;
  reviews?: number;
}

export default function CarsPage() {
  const [aiRecommendations, setAiRecommendations] = useState<AICar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    manufacturer: '',
    type: '',
    fuel: '',
    transmission: '',
    year: '',
    price_range: ''
  });
  const { isConnected } = useAccount();
  const { mintedCars } = useMintedCars();
  
  const recommendedCars = cars.filter((car) => car.recommended)
  const allCars = cars

  const fetchAiRecommendations = async (filterData = {}) => {
    try {
      setIsLoading(true);
      const features = Object.keys(filterData).length > 0 ? filterData : {
        manufacturer: 'Tesla',
        fuel: 'Electric',
        type: 'Sedan'
      };
      const recommendations = await getRecommendationsByFeatures(features);
      console.log('🤖 AI Recommendations from Flask:', recommendations);
      const formattedCars = recommendations.map((car) => ({
        ...car,
        location: 'Downtown',
        rating: 4.8,
        reviews: 120
      }));
      setAiRecommendations(formattedCars);
    } catch (error) {
      console.error('Failed to fetch AI recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const activeFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== '')
    );
    
    if (Object.keys(activeFilters).length > 0) {
      fetchAiRecommendations(activeFilters);
    }
  };

  useEffect(() => {
    fetchAiRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Find Your Perfect Car
            </h1>
            <p className="text-gray-600">
              AI-powered recommendations based on your preferences
            </p>
          </div>
          <MintCarModal>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              {isConnected ? 'Mint Car NFT' : 'Connect to Mint'}
            </Button>
          </MintCarModal>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-gray-200 py-5">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Select
                onValueChange={(value) =>
                  handleFilterChange('manufacturer', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tesla">Tesla</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                  <SelectItem value="Ford">Ford</SelectItem>
                  <SelectItem value="Honda">Honda</SelectItem>
                  <SelectItem value="Audi">Audi</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Coupe">Coupe</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange('fuel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Gasoline">Gasoline</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleFilterChange('transmission', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange('year', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleFilterChange('price_range', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-50">10$ - 50$</SelectItem>
                  <SelectItem value="50-100">50$ - 100$</SelectItem>
                  <SelectItem value="100-300">100$ - 300$</SelectItem>
                  <SelectItem value="300-500">300$ - 500$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommended Cars */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Recommended for You
              </h2>
              <p className="text-gray-600">Based on your preferences</p>
            </div>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              Powered by AI
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-500">
                  Loading AI recommendations...
                </div>
              </div>
            ) : aiRecommendations.length > 0 ? (
              aiRecommendations.map((car) => (
                <Card
                  key={car.id}
                  className="pb-5 group hover:shadow-xl transition-all duration-300 border-orange-200 bg-gradient-to-br from-orange-50 to-white"
                >
                  <div className="relative">
                    <Image
                    src={`/images/${car.id}.jpg`}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={100}
                    height={100}
                  />
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      🤖 AI Recommended
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
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
                      <div className="text-right shrink-0">
                        <div className="text-xl font-bold text-orange-500">
                          ${car.price}
                        </div>
                        <div className="text-sm text-gray-500">per day</div>
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
                      {car.features
                        .split(', ')
                        .slice(0, 3)
                        .map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-orange-100 text-orange-700 border-orange-200 break-words max-w-64 whitespace-normal"
                          >
                            {feature.trim()}
                          </Badge>
                        ))}
                    </div>

                    <Link href={`/cars/${car.id}`}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              recommendedCars.map((car) => (
                <Card
                  key={car.id}
                  className="pb-5 group hover:shadow-xl transition-all duration-300 border-orange-200 bg-gradient-to-br from-orange-50 to-white"
                >
                  <div className="relative">
                    <Image
                      src={imgLink || '/placeholder.svg'}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      Recommended
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-gray-800">
                          {car.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {car.year} • {car.type} • {car.fuel}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">
                          ${car.price}
                        </div>
                        <div className="text-sm text-gray-500">per day</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-800">
                          {car.rating}
                        </span>
                        <span className="text-gray-500">({car.reviews})</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{car.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/cars/${car.id}`}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white group-hover:bg-orange-600">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* My Minted Cars */}
        {mintedCars.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  My Minted Cars
                </h2>
                <p className="text-gray-600">Cars you've minted as NFTs</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                NFT Collection
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
                      <div className="text-right shrink-0">
                        <div className="text-xl font-bold text-blue-500">
                          ${car.price}
                        </div>
                        <div className="text-sm text-gray-500">per day</div>
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
                          className="text-xs bg-blue-100 text-blue-700 border-blue-200 break-words max-w-64 whitespace-normal"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/cars/${car.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Available Cars */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Available Cars
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{allCars.length} cars found</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCars.map((car) => (
              <Card
                key={car.id}
                className="pb-5 group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={`/images/${car.id}.jpg`}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={100}
                    height={100}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800">
                        {car.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {car.year} • {car.type} • {car.fuel}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">
                        ${car.price}
                      </div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-800">
                        {car.rating}
                      </span>
                      <span className="text-gray-500">({car.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {car.features.slice(0, 2).map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/cars/${car.id}`}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}