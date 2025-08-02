"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Car, Star, Calendar, DollarSign, TrendingUp, Users, Plus, Eye, Edit, Trash2, BarChart3 } from "lucide-react"
import Link from "next/link"
import imgLink from "@/assets/cars/placeholder.jpg"
import Image from "next/image"
import { useRentalHistory } from '@/hooks/useRentalHistory'
import { useMintedCars } from '@/hooks/useMintedCars'
import { useAccount } from 'wagmi'

const renterData = {
  activeRentals: [
    {
      id: 1,
      car: "Tesla Model 3",
      owner: "Sarah Johnson",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      price: 267,
      status: "active",
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  pastRentals: [
    {
      id: 2,
      car: "BMW X5",
      owner: "Mike Chen",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      price: 250,
      status: "completed",
      rating: 5,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      car: "Toyota Camry",
      owner: "Emily Rodriguez",
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      price: 130,
      status: "completed",
      rating: 4,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  stats: {
    totalRentals: 12,
    totalSpent: 2450,
    avgRating: 4.8,
    favoriteType: "Electric",
  },
}

const ownerData = {
  cars: [
    {
      id: 1,
      name: "Tesla Model S",
      year: 2023,
      price: 120,
      status: "available",
      rating: 4.9,
      bookings: 45,
      earnings: 5400,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      name: "Mercedes C-Class",
      year: 2022,
      price: 95,
      status: "rented",
      rating: 4.7,
      bookings: 32,
      earnings: 3040,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  bookings: [
    {
      id: 1,
      renter: "John Doe",
      car: "Tesla Model S",
      startDate: "2024-01-20",
      endDate: "2024-01-23",
      price: 360,
      status: "confirmed",
    },
    {
      id: 2,
      renter: "Jane Smith",
      car: "Mercedes C-Class",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      price: 190,
      status: "active",
    },
  ],
  stats: {
    totalEarnings: 8440,
    totalBookings: 77,
    avgRating: 4.8,
    occupancyRate: 78,
  },
}

const adminData = {
  platformStats: {
    totalUsers: 15420,
    totalCars: 3240,
    totalBookings: 8950,
    totalRevenue: 1250000,
  },
  recentActivity: [
    { type: "new_user", user: "Alice Johnson", time: "2 minutes ago" },
    { type: "new_car", owner: "Bob Smith", car: "Honda Civic", time: "15 minutes ago" },
    { type: "booking", renter: "Carol Davis", car: "Tesla Model 3", time: "1 hour ago" },
    { type: "review", user: "David Wilson", rating: 5, time: "2 hours ago" },
  ],
}

export default function DashboardPage() {
  const { rentals, activeRentals, completedRentals } = useRentalHistory();
  const { mintedCars } = useMintedCars();
  const { isConnected } = useAccount();

  const totalSpent = rentals.reduce((sum, rental) => sum + parseFloat(rental.totalPrice), 0);
  const avgRating = 4.8; // Default rating

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your rentals, cars, and account</p>
        </div>

        <Tabs defaultValue="renter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="renter">Renter</TabsTrigger>
            <TabsTrigger value="owner">Owner</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {/* Renter Dashboard */}
          <TabsContent value="renter" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Rentals</CardTitle>
                  <Car className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{rentals.length}</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{totalSpent.toFixed(3)} ETH</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{avgRating}</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Rentals</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{activeRentals.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Active Rentals */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Active Rentals</CardTitle>
                <CardDescription>Your current car rentals</CardDescription>
              </CardHeader>
              <CardContent>
                {activeRentals.length > 0 ? (
                  <div className="space-y-4">
                    {activeRentals.map((rental) => (
                      <div
                        key={rental.id}
                        className="flex items-center space-x-4 p-4 border border-orange-200 rounded-lg bg-orange-50"
                      >
                        <Image
                          src={imgLink || "/placeholder.svg"}
                          alt={rental.carName}
                          className="w-20 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{rental.carName}</h3>
                          <p className="text-sm text-gray-600">{rental.days} days rental</p>
                          <p className="text-sm text-gray-600">
                            {rental.startDate} to {rental.endDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-orange-500">{rental.totalPrice} ETH</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No active rentals</p>
                    <Link href="/cars">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Cars</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Rentals */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Rental History</CardTitle>
                <CardDescription>Your completed and active rentals</CardDescription>
              </CardHeader>
              <CardContent>
                {rentals.length > 0 ? (
                  <div className="space-y-4">
                    {rentals.map((rental) => (
                      <div key={rental.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <Image
                          src={imgLink || "/placeholder.svg"}
                          alt={rental.carName}
                          className="w-20 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{rental.carName}</h3>
                          <p className="text-sm text-gray-600">{rental.days} days • {rental.pricePerDay} ETH/day</p>
                          <p className="text-sm text-gray-600">
                            {rental.startDate} to {rental.endDate}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-800">{rental.totalPrice} ETH</div>
                          <Badge 
                            className={rental.status === 'active' 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {rental.status === 'active' ? 'Active' : 'Completed'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No rental history yet</p>
                    <Link href="/cars">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Start Renting</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Owner Dashboard */}
          <TabsContent value="owner" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">${ownerData.stats.totalEarnings}</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{ownerData.stats.totalBookings}</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{ownerData.stats.avgRating}</div>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{ownerData.stats.occupancyRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* My Cars */}
            <Card className="py-5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gray-800">My Cars</CardTitle>
                  <CardDescription>Manage your listed vehicles</CardDescription>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Car
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerData.cars.map((car) => (
                    <div key={car.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <Image
                        src={imgLink || "/placeholder.svg"}
                        alt={car.name}
                        className="w-20 h-14 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{car.name}</h3>
                        <p className="text-sm text-gray-600">
                          {car.year} • ${car.price}/day
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">{car.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{car.bookings} bookings</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">${car.earnings}</div>
                        <p className="text-sm text-gray-600">Total earned</p>
                      </div>
                      <div className="text-center">
                        <Badge
                          className={
                            car.status === "available"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          }
                        >
                          {car.status === "available" ? "Available" : "Rented"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Bookings</CardTitle>
                <CardDescription>Latest rental requests for your cars</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerData.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">{booking.renter}</h3>
                        <p className="text-sm text-gray-600">{booking.car}</p>
                        <p className="text-sm text-gray-600">
                          {booking.startDate} to {booking.endDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${booking.price}</div>
                        <Badge
                          className={
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          }
                        >
                          {booking.status === "confirmed" ? "Confirmed" : "Active"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Dashboard */}
          <TabsContent value="admin" className="space-y-6">
            {/* Platform Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    {adminData.platformStats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Cars</CardTitle>
                  <Car className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    {adminData.platformStats.totalCars.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    {adminData.platformStats.totalBookings.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                </CardContent>
              </Card>
              <Card className="py-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    ${adminData.platformStats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 mt-1">+22% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="py-5">
                <CardHeader>
                  <CardTitle className="text-gray-800">Platform Health</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">User Satisfaction</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Car Utilization</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">AI Accuracy</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">System Uptime</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-5">
                <CardHeader>
                  <CardTitle className="text-gray-800">Recent Activity</CardTitle>
                  <CardDescription>Latest platform events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          {activity.type === "new_user" && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">{activity.user}</span> joined the platform
                            </p>
                          )}
                          {activity.type === "new_car" && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">{activity.owner}</span> listed a {activity.car}
                            </p>
                          )}
                          {activity.type === "booking" && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">{activity.renter}</span> booked a {activity.car}
                            </p>
                          )}
                          {activity.type === "review" && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">{activity.user}</span> left a {activity.rating}-star review
                            </p>
                          )}
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Admin Actions</CardTitle>
                <CardDescription>Platform management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <Users className="h-6 w-6 mb-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <Car className="h-6 w-6 mb-2" />
                    Review Cars
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}