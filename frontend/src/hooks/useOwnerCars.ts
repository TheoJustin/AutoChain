import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { CAR_NFT_ADDRESS, CAR_NFT_ABI } from '@/contracts/CarNFT';
import { CARS_FOR_RENT_ADDRESS, CARS_FOR_RENT_ABI } from '@/contracts/CarsForRent';
import imgLink from '@/assets/cars/placeholder.jpg';

interface OwnerCar {
  id: number;
  name: string;
  year: number;
  price: number;
  status: 'available' | 'rented';
  rating: number;
  bookings: number;
  earnings: number;
  image: string;
  tokenId: number;
  manufacturer: string;
  carType: string;
  fuelType: string;
  transmission: string;
}

export function useOwnerCars() {
  const [ownerCars, setOwnerCars] = useState<OwnerCar[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    const fetchOwnerCars = async () => {
      if (!address) {
        setOwnerCars([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get minted cars from localStorage (temporary solution until we have proper indexing)
        const stored = localStorage.getItem(`mintedCars_${address}`);
        if (stored) {
          const mintedCars = JSON.parse(stored);
          
          // Transform minted cars to owner cars format
          const transformedCars: OwnerCar[] = await Promise.all(
            mintedCars.map(async (car: any) => {
              // Get listing price from smart contract
              let price = 0;
              let isListed = false;
              
              try {
                // TODO: Implement actual contract reading when wagmi config is properly set up
                // For now, check if car has listing data in localStorage
                const listingData = localStorage.getItem(`carListing_${car.tokenId}`);
                if (listingData) {
                  const listing = JSON.parse(listingData);
                  price = listing.pricePerDay || 0.1;
                  isListed = listing.active || false;
                }
              } catch (error) {
                console.log('Error checking listing for token', car.tokenId);
              }
              
              // If not listed, use stored price or default
              if (!isListed) {
                price = car.price ? car.price / 1000 : 0.1; // Default 0.1 ETH/day
              }

              return {
                id: car.tokenId,
                name: car.name,
                year: car.year,
                price: price * 1000, // Store in smaller units for display
                status: isListed ? 'available' as const : 'available' as const,
                rating: 5.0, // Default rating
                bookings: 0, // Default bookings
                earnings: 0, // Default earnings
                image: imgLink,
                tokenId: car.tokenId,
                manufacturer: car.manufacturer,
                carType: car.type,
                fuelType: car.fuel,
                transmission: car.transmission,
              };
            })
          );
          
          setOwnerCars(transformedCars);
        }
      } catch (error) {
        console.error('Error fetching owner cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerCars();
  }, [address]);

  const stats = {
    totalEarnings: ownerCars.reduce((sum, car) => sum + car.earnings, 0),
    totalBookings: ownerCars.reduce((sum, car) => sum + car.bookings, 0),
    avgRating: ownerCars.length > 0 
      ? ownerCars.reduce((sum, car) => sum + car.rating, 0) / ownerCars.length 
      : 0,
    occupancyRate: 100, // Default occupancy rate
  };

  return {
    ownerCars,
    loading,
    stats,
  };
}