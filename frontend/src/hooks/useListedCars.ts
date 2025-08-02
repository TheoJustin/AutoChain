import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { CAR_NFT_ADDRESS } from '@/contracts/CarNFT';
import { CARS_FOR_RENT_ADDRESS, CARS_FOR_RENT_ABI } from '@/contracts/CarsForRent';
import imgLink from '@/assets/cars/placeholder.jpg';

interface ListedCar {
  id: number;
  name: string;
  manufacturer: string;
  year: number;
  type: string;
  fuel: string;
  transmission: string;
  condition: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  features: string[];
  tokenId: number;
  pricePerDay: string;
  owner: string;
}

export function useListedCars() {
  const [listedCars, setListedCars] = useState<ListedCar[]>([]);

  // Load listed cars from localStorage (temporary solution)
  // In production, this would fetch from blockchain events or a backend service
  useEffect(() => {
    const loadListedCars = () => {
      const allListedCars: ListedCar[] = [];
      
      // Get all stored minted cars from all users
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('mintedCars_')) {
          try {
            const cars = JSON.parse(localStorage.getItem(key) || '[]');
            // Convert minted cars to listed cars format
            const convertedCars = cars.map((car: any) => ({
              ...car,
              image: imgLink,
              pricePerDay: '0.01', // Default price, would come from blockchain in production
              owner: key.replace('mintedCars_', ''),
            }));
            allListedCars.push(...convertedCars);
          } catch (error) {
            console.error('Error loading cars from localStorage:', error);
          }
        }
      }
      
      setListedCars(allListedCars);
    };

    loadListedCars();
    
    // Listen for storage changes to update when new cars are minted
    const handleStorageChange = () => {
      loadListedCars();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for updates
    const interval = setInterval(loadListedCars, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return {
    listedCars
  };
}