import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Car, MapPin, Star, Calendar, ArrowLeft, Heart, Share, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

const carDetails = {
  id: 1,
  name: "Tesla Model 3",
  manufacturer: "Tesla",
  model: "Model 3",
  year: 2023,
  type: "Sedan",
  fuel: "Electric",
  transmission: "Automatic",
  drive: "RWD",
  condition: "Excellent",
  paintColor: "Pearl White",
  price: 89,
  rating: 4.9,
  reviews: 127,
  location: "Downtown",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  features: [
    "Autopilot",
    "Supercharging",
    "Premium Interior",
    "Glass Roof",
    "Mobile Connector",
    "Over-the-Air Updates",
  ],
  specifications: {
    range: "358 miles",
    acceleration: "5.8s 0-60 mph",
    topSpeed: "140 mph",
    seating: "5 passengers",
    cargo: "15 cu ft",
    charging: "Supercharger Compatible",
  },
  owner: {
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 45,
    joinDate: "2022",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  description:
    "Experience the future of driving with this pristine Tesla Model 3. This vehicle combines cutting-edge technology with exceptional performance and efficiency. Perfect for city commuting or weekend getaways.",
  rules: ["No smoking", "No pets", "Return with same fuel level", "Maximum 200 miles per day"],
}

const similarCars = [
  {
    id: 2,
    name: "Tesla Model Y",
    year: 2023,
    price: 105,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    name: "BMW i4",
    year: 2022,
    price: 95,
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 4,
    name: "Polestar 2",
    year: 2023,
    price: 85,
    rating: 4.6,
    image: "/placeholder.svg?height=150&width=200",
  },
]

const reviews = [
  {
    id: 1,
    user: "Mike Chen",
    rating: 5,
    date: "2 days ago",
    comment:
      "Amazing car! The autopilot feature made my road trip so much more enjoyable. Sarah was very responsive and the car was spotless.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Emily Rodriguez",
    rating: 5,
    date: "1 week ago",
    comment:
      "Perfect for my business trip. The car was exactly as described and the charging was convenient. Highly recommend!",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "David Kim",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great experience overall. The car drives smoothly and the tech features are impressive. Will definitely rent again.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function CarDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/cars" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cars
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img
                  src={carDetails.images[0] || "/placeholder.svg"}
                  alt={carDetails.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">🤖 AI Recommended</Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {carDetails.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${carDetails.name} view ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{carDetails.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>{carDetails.year}</span>
                    <span>•</span>
                    <span>{carDetails.type}</span>
                    <span>•</span>
                    <span>{carDetails.fuel}</span>
                    <span>•</span>
                    <span>{carDetails.transmission}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-500">${carDetails.price}</div>
                  <div className="text-gray-500">per day</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-800">{carDetails.rating}</span>
                  <span className="text-gray-500">({carDetails.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{carDetails.location}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{carDetails.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {carDetails.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(carDetails.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Info */}
              <Card className="mb-8 py-5">
                <CardHeader>
                  <CardTitle className="text-gray-800">Car Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={carDetails.owner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{carDetails.owner.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {carDetails.owner.rating} ({carDetails.owner.reviews} reviews)
                        </div>
                        <span>Joined {carDetails.owner.joinDate}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                      Contact Owner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card className="mb-8 py-5">
                <CardHeader>
                  <CardTitle className="text-gray-800">Rental Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {carDetails.rules.map((rule, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Shield className="h-4 w-4 mr-2 text-orange-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Reviews */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews ({reviews.length})</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="pb-4">
                      <CardContent className="pt-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-gray-800">{review.user}</h5>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 mb-8 py-5">
              <Card className="py-5 mb-8">
                <CardHeader>
                  <CardTitle className="text-gray-800">Book This Car</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Pick-up Date</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        Select date
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Return Date</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        Select date
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily rate</span>
                      <span className="font-medium">${carDetails.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">$15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">$25</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-orange-500">${carDetails.price + 40}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Book Now</Button>

                  <div className="text-center text-sm text-gray-500">Free cancellation up to 24 hours before pickup</div>
                </CardContent>
              </Card>
              
              <Card className="py-5">
                <CardHeader>
                  <CardTitle className="text-gray-800">🤖 Similar AI Recommendations</CardTitle>
                  <CardDescription>Based on this car's features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarCars.map((car) => (
                    <Link key={car.id} href={`/cars/${car.id}`}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={car.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{car.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{car.year}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm">{car.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-orange-500">${car.price}</div>
                          <div className="text-xs text-gray-500">per day</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}