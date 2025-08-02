"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, DollarSign, Clock } from 'lucide-react';

interface RentalDetailsModalProps {
  carName: string;
  currentRenter?: string;
  rentalEndDate?: string;
  earnings: number;
  bookings: number;
  children: React.ReactNode;
}

export function RentalDetailsModal({ 
  carName, 
  currentRenter, 
  rentalEndDate, 
  earnings, 
  bookings, 
  children 
}: RentalDetailsModalProps) {
  const isCurrentlyRented = currentRenter && rentalEndDate && new Date(rentalEndDate) > new Date();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rental Details - {carName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Status */}
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Current Status</h3>
              <Badge className={isCurrentlyRented ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                {isCurrentlyRented ? "Rented" : "Available"}
              </Badge>
            </div>
            
            {isCurrentlyRented && currentRenter && rentalEndDate && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Rented by: {currentRenter}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Until: {new Date(rentalEndDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>
                    {Math.ceil((new Date(rentalEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Earnings & Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Total Earnings</span>
              </div>
              <div className="text-lg font-bold text-green-600">{earnings.toFixed(3)} ETH</div>
            </div>
            
            <div className="p-3 rounded-lg border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Total Bookings</span>
              </div>
              <div className="text-lg font-bold text-blue-600">{bookings}</div>
            </div>
          </div>

          {!isCurrentlyRented && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 text-center">
                🎉 Your car is available for rent! It will appear in the marketplace for users to book.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}