import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import imgLink from '@/assets/cars/placeholder.jpg';

interface MintedCar {
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
  mintedAt: Date;
}

export function useMintedCars() {
  const [mintedCars, setMintedCars] = useState<MintedCar[]>([]);
  const { address } = useAccount();

  // Load minted cars from localStorage (temporary solution)
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`mintedCars_${address}`);
      if (stored) {
        try {
          const cars = JSON.parse(stored);
          setMintedCars(cars);
        } catch (error) {
          console.error('Error loading minted cars:', error);
        }
      }
    }
  }, [address]);

  const addMintedCar = (carData: {
    manufacturer: string;
    carType: string;
    fuelType: string;
    transmission: string;
    year: number;
    pricePerDay?: string;
    tokenId: number;
  }) => {
    if (!address) return;

    const newCar: MintedCar = {
      id: carData.tokenId,
      name: `${carData.manufacturer} ${carData.carType}`,
      manufacturer: carData.manufacturer,
      year: carData.year,
      type: carData.carType,
      fuel: carData.fuelType,
      transmission: carData.transmission,
      condition: 'New',
      price: carData.pricePerDay ? parseFloat(carData.pricePerDay) * 100 : 0, // Convert ETH to USD estimate
      rating: 5.0,
      reviews: 0,
      location: 'Your Garage',
      image: imgLink.src,
      features: ['NFT Verified', 'Blockchain Owned', 'Smart Contract'],
      tokenId: carData.tokenId,
      mintedAt: new Date()
    };

    const updatedCars = [newCar, ...mintedCars];
    setMintedCars(updatedCars);

    // Save to localStorage
    localStorage.setItem(`mintedCars_${address}`, JSON.stringify(updatedCars));
  };

  return {
    mintedCars,
    addMintedCar
  };
}