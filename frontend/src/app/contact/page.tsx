import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, Shield } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about AutoChain? We're here to help you with rentals, listings, or technical support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rental">Rental Support</SelectItem>
                      <SelectItem value="listing">Car Listing Help</SelectItem>
                      <SelectItem value="wallet">Wallet & Payments</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your question or issue in detail..."
                    className="min-h-32"
                  />
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">support@autochain.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800">Address</p>
                    <p className="text-gray-600">
                      123 Innovation Drive
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800">Support Hours</p>
                    <p className="text-gray-600">
                      24/7 Online Support
                      <br />
                      Phone: Mon-Fri 9AM-6PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Help</CardTitle>
                <CardDescription>Common questions and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ & Help Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Safety Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50 py-5">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Support</CardTitle>
                <CardDescription className="text-red-600">For urgent issues during active rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Hotline
                </Button>
                <p className="text-sm text-red-600 mt-2 text-center">Available 24/7 for active rental emergencies</p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-gray-800">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Discord
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Telegram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">How do I rent a car?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse available cars, select your dates, connect your wallet, and complete the booking. Our AI will
                  recommend the best cars for your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">How do I list my car?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Click "List Your Car", upload photos (our AI will verify they're cars), set your price and
                  availability, and start earning from rentals.
                </p>
              </CardContent>
            </Card>

            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">What wallets are supported?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We currently support MetaMask and other Web3 wallets. All transactions are secured on the Ethereum
                  blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="py-5">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">How does AI recommendation work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI analyzes your preferences, rental history, and car features like manufacturer, model, year,
                  fuel type, and more to suggest perfect matches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}