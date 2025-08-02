import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface OwnerBooking {
  id: number;
  renter: string;
  car: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'confirmed' | 'active' | 'completed';
  tokenId: number;
}

export function useOwnerBookings() {
  const [bookings, setBookings] = useState<OwnerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    const fetchOwnerBookings = async () => {
      if (!address) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get bookings from localStorage (temporary solution)
        const stored = localStorage.getItem(`ownerBookings_${address}`);
        if (stored) {
          const ownerBookings = JSON.parse(stored);
          setBookings(ownerBookings);
        } else {
          // Default empty bookings
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching owner bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerBookings();
  }, [address]);

  const addBooking = (booking: Omit<OwnerBooking, 'id'>) => {
    if (!address) return;

    const newBooking: OwnerBooking = {
      ...booking,
      id: Date.now(), // Simple ID generation
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    
    // Save to localStorage
    localStorage.setItem(`ownerBookings_${address}`, JSON.stringify(updatedBookings));
  };

  return {
    bookings,
    loading,
    addBooking,
  };
}