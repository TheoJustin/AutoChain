import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, MapPin, Star, Filter, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cars } from "@/data/cars"
import imgLink from "@/assets/cars/placeholder.jpg"
import Image from "next/image"

export default function CarsPage() {
  const recommendedCars = cars.filter((car) => car.recommended)
  const allCars = cars

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Car</h1>
          <p className="text-gray-600">AI-powered recommendations based on your preferences</p>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tesla">Tesla</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>

              <Select>
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

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">10$ - 50$</SelectItem>
                  <SelectItem value="2022">50$ - 100$</SelectItem>
                  <SelectItem value="2021">100$ - 300$</SelectItem>
                  <SelectItem value="2020">300$ - 500$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommended Cars */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended for You</h2>
              <p className="text-gray-600">Based on your preferences</p>
            </div>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Powered by AI</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCars.map((car) => (
              <Card
                key={car.id}
                className="pb-5 group hover:shadow-xl transition-all duration-300 border-orange-200 bg-gradient-to-br from-orange-50 to-white"
              >
                <div className="relative">
                  <Image
                    src={imgLink || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white">Recommended</Badge>
                  <Button size="sm" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800">{car.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {car.year} • {car.type} • {car.fuel}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">${car.price}</div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-800">{car.rating}</span>
                      <span className="text-gray-500">({car.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {car.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
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
            ))}
          </div>
        </section>

        {/* All Available Cars */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Available Cars</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{allCars.length} cars found</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCars.map((car) => (
              <Card key={car.id} className="pb-5 group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Image
                    src={imgLink || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button size="sm" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800">{car.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {car.year} • {car.type} • {car.fuel}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">${car.price}</div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-800">{car.rating}</span>
                      <span className="text-gray-500">({car.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {car.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
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
  )
}