"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useWriteContract, useReadContract, useAccount } from "wagmi"
import { CONTACT_OBJECTS_ADDRESS, CONTACT_OBJECTS_ABI } from "@/contracts/ContactObjects"

interface ContactMessage {
  contactId: bigint
  firstName: string
  email: string
  message: string
  timestamp: bigint
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  
  const { data: totalMessages, error: totalError, refetch: refetchTotal } = useReadContract({
    address: CONTACT_OBJECTS_ADDRESS,
    abi: CONTACT_OBJECTS_ABI,
    functionName: "totalMessages",
  })
  
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState<any>(null)
  
  const fetchMessages = async () => {
    if (!totalMessages || Number(totalMessages) === 0) {
      setMessages([])
      return
    }
    
    setMessagesLoading(true)
    setMessagesError(null)
    
    try {
      const messagePromises = []
      for (let i = 1; i <= Number(totalMessages); i++) {
        messagePromises.push(
          fetch('http://127.0.0.1:8545', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: CONTACT_OBJECTS_ADDRESS,
                data: `0x7b8c1250${i.toString(16).padStart(64, '0')}`
              }, 'latest'],
              id: i
            })
          }).then(res => res.json())
        )
      }
      
      const results = await Promise.all(messagePromises)
      const fetchedMessages: ContactMessage[] = results.map((result, index) => {
        if (result.result) {
          const decoded = result.result.slice(2)
          const contactId = BigInt('0x' + decoded.slice(0, 64))
          const firstNameOffset = parseInt(decoded.slice(64, 128), 16) * 2
          const emailOffset = parseInt(decoded.slice(128, 192), 16) * 2
          const messageOffset = parseInt(decoded.slice(192, 256), 16) * 2
          const timestamp = BigInt('0x' + decoded.slice(256, 320))
          
          const firstNameLength = parseInt(decoded.slice(firstNameOffset, firstNameOffset + 64), 16) * 2
          const firstName = Buffer.from(decoded.slice(firstNameOffset + 64, firstNameOffset + 64 + firstNameLength), 'hex').toString('utf8')
          
          const emailLength = parseInt(decoded.slice(emailOffset, emailOffset + 64), 16) * 2
          const email = Buffer.from(decoded.slice(emailOffset + 64, emailOffset + 64 + emailLength), 'hex').toString('utf8')
          
          const messageLength = parseInt(decoded.slice(messageOffset, messageOffset + 64), 16) * 2
          const message = Buffer.from(decoded.slice(messageOffset + 64, messageOffset + 64 + messageLength), 'hex').toString('utf8')
          
          return { contactId, firstName, email, message, timestamp }
        }
        return null
      }).filter(Boolean) as ContactMessage[]
      
      setMessages(fetchedMessages)
    } catch (error) {
      setMessagesError(error)
    } finally {
      setMessagesLoading(false)
    }
  }
  
  useEffect(() => {
    fetchMessages()
  }, [totalMessages])
  
  const refetch = () => {
    refetchTotal()
    fetchMessages()
  }
  
  // Debug logging
  useEffect(() => {
    console.log('Contract Address:', CONTACT_OBJECTS_ADDRESS)
    console.log('Total messages:', totalMessages)
    console.log('Total messages error:', totalError)
    console.log('Messages data:', messages)
    console.log('Messages loading:', messagesLoading)
    console.log('Messages error:', messagesError)
    console.log('Connected address:', address)
  }, [messages, totalMessages, totalError, messagesLoading, messagesError, address])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      alert("Please connect your wallet first")
      return
    }
    
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await writeContract({
        address: CONTACT_OBJECTS_ADDRESS,
        abi: CONTACT_OBJECTS_ABI,
        functionName: "createContactMessage",
        args: [
          formData.firstName,
          formData.email,
          formData.message
        ]
      })
      
      // Reset form
      setFormData({
        firstName: "",
        email: "",
        message: ""
      })
      
      // Refetch messages after a short delay
      setTimeout(() => {
        refetch()
      }, 3000)
      
      alert("Message submitted successfully!")
      
    } catch (error) {
      console.error("Error submitting message:", error)
      alert("Failed to submit message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
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
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or issue in detail..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                    disabled={isSubmitting || !address}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  
                  {!address && (
                    <p className="text-sm text-red-600 text-center mt-2">
                      Please connect your wallet to submit a message
                    </p>
                  )}
                </form>
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

        {/* Contact Messages Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
            <Button onClick={() => refetch()} variant="outline" size="sm">
              Refresh Messages
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            {messagesLoading ? (
              <Card className="py-8">
                <CardContent className="text-center">
                  <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Loading messages...</p>
                </CardContent>
              </Card>
            ) : messagesError ? (
              <Card className="py-8 border-red-200">
                <CardContent className="text-center">
                  <p className="text-red-600">Error loading messages: {messagesError.message}</p>
                  <Button onClick={() => refetch()} className="mt-4" variant="outline">
                    Retry
                  </Button>
                </CardContent>
              </Card>
            ) : messages && messages.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center mb-4">Total messages: {messages.length}</p>
                {messages.slice().reverse().map((msg, index) => (
                  <Card key={index} className="py-4">
                    <CardContent>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {msg.firstName}
                          </h3>
                          <p className="text-sm text-gray-600">{msg.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(Number(msg.timestamp) * 1000).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(Number(msg.timestamp) * 1000).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700">{msg.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="py-8">
                <CardContent className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sending this message will go throgh the contract</p>
                  <p className="text-sm text-gray-500 mt-2">Total messages in contract: {totalMessages?.toString() || '0'}</p>
                </CardContent>
              </Card>
            )}
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