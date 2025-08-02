"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCarNFT, useCarPrice } from '@/hooks/useCarNFT';
import { useRentalHistory } from '@/hooks/useRentalHistory';
import { RentalService } from '@/services/rentalService';
import { useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';

interface RentCarModalProps {
  carId: number;
  carName: string;
  pricePerDay?: string;
  children: React.ReactNode;
}

export function RentCarModal({ carId, carName, pricePerDay: propPricePerDay, children }: RentCarModalProps) {
  const [days, setDays] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { rentCar } = useCarNFT();
  const { data: contractPricePerDay } = useCarPrice(carId);
  const { addRental } = useRentalHistory();
  const { isConnected, address } = useAccount();

  const pricePerDay = propPricePerDay ? parseEther(propPricePerDay).toString() : contractPricePerDay;
  const totalPrice = pricePerDay ? (BigInt(pricePerDay) * BigInt(days)).toString() : '0';

  const handleRent = async () => {
    if (!isConnected || !pricePerDay || !address) return;
    
    setIsProcessing(true);
    try {
      const totalPriceEth = formatEther(BigInt(totalPrice));
      
      if (propPricePerDay) {
        // For locally stored cars, use the rental service
        const rental = await RentalService.processRental(
          carId,
          carName,
          days,
          propPricePerDay,
          address
        );
        
        // Add to renter's history
        addRental({
          carId,
          carName,
          tokenId: carId,
          days,
          pricePerDay: propPricePerDay,
          totalPrice: totalPriceEth
        });
        
        alert(`Successfully rented ${carName} for ${days} days! Total: ${totalPriceEth} ETH\n\nPayment processed and owner notified.`);
      } else {
        // For blockchain-listed cars, use the contract
        await rentCar(carId, days, totalPrice);
        addRental({
          carId,
          carName,
          days,
          pricePerDay: formatEther(BigInt(pricePerDay)),
          totalPrice: totalPriceEth
        });
        
        alert(`Successfully rented ${carName} for ${days} days! Blockchain transaction completed.`);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to rent car:', error);
      alert(`Rental failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rent {carName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="days">Number of Days</Label>
            <Input
              id="days"
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 1)}
            />
          </div>
          
          {pricePerDay && (
            <div className="space-y-2">
              <p>Price per day: {formatEther(BigInt(pricePerDay))} ETH</p>
              <p className="font-bold">Total: {formatEther(BigInt(totalPrice))} ETH</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
              <p><strong>Payment Details:</strong></p>
              <p>• Total Amount: {formatEther(BigInt(totalPrice))} ETH</p>
              <p>• Payment will be processed instantly</p>
              <p>• Owner will be notified of your rental</p>
            </div>
            
            <Button 
              onClick={handleRent} 
              disabled={!isConnected || !pricePerDay || isProcessing}
              className="w-full"
            >
              {!isConnected ? 'Connect Wallet' : isProcessing ? 'Processing Payment...' : `Pay ${formatEther(BigInt(totalPrice))} ETH & Rent Car`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}