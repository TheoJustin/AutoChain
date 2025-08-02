import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface Rental {
  id: string;
  carId: number;
  carName: string;
  tokenId?: number;
  days: number;
  pricePerDay: string;
  totalPrice: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  rentedAt: Date;
}

export function useRentalHistory() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`rentals_${address}`);
      if (stored) {
        try {
          const rentalData = JSON.parse(stored);
          setRentals(rentalData);
        } catch (error) {
          console.error('Error loading rental history:', error);
        }
      }
    }
  }, [address]);

  const addRental = (rentalData: {
    carId: number;
    carName: string;
    tokenId?: number;
    days: number;
    pricePerDay: string;
    totalPrice: string;
  }) => {
    if (!address) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + rentalData.days);

    const newRental: Rental = {
      id: `rental_${Date.now()}`,
      ...rentalData,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'active',
      rentedAt: new Date()
    };

    const updatedRentals = [newRental, ...rentals];
    setRentals(updatedRentals);
    
    localStorage.setItem(`rentals_${address}`, JSON.stringify(updatedRentals));
  };

  const activeRentals = rentals.filter(rental => rental.status === 'active');
  const completedRentals = rentals.filter(rental => rental.status === 'completed');

  return {
    rentals,
    activeRentals,
    completedRentals,
    addRental
  };
}