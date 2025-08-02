"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCarNFT, useCarPrice } from '@/hooks/useCarNFT';
import { useRentalHistory } from '@/hooks/useRentalHistory';
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
  const { rentCar } = useCarNFT();
  const { data: contractPricePerDay } = useCarPrice(carId);
  const { addRental } = useRentalHistory();
  const { isConnected } = useAccount();

  const pricePerDay = propPricePerDay ? parseEther(propPricePerDay).toString() : contractPricePerDay;
  const totalPrice = pricePerDay ? (BigInt(pricePerDay) * BigInt(days)).toString() : '0';

  const handleRent = async () => {
    if (!isConnected || !pricePerDay) return;
    
    try {
      if (propPricePerDay) {
        // For locally stored cars, simulate the rental and save to history
        addRental({
          carId,
          carName,
          tokenId: carId,
          days,
          pricePerDay: propPricePerDay,
          totalPrice: formatEther(BigInt(totalPrice))
        });
        alert(`Successfully rented ${carName} for ${days} days!`);
      } else {
        // For blockchain-listed cars, use the contract
        await rentCar(carId, days, totalPrice);
        addRental({
          carId,
          carName,
          days,
          pricePerDay: formatEther(BigInt(pricePerDay)),
          totalPrice: formatEther(BigInt(totalPrice))
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to rent car:', error);
      alert('Rental failed. Please try again.');
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

          <Button 
            onClick={handleRent} 
            disabled={!isConnected || !pricePerDay}
            className="w-full"
          >
            {!isConnected ? 'Connect Wallet' : 'Rent Car'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}