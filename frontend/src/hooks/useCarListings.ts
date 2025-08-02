import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface CarListing {
  tokenId: number;
  pricePerDay: number; // in ETH
  active: boolean;
  listedAt: Date;
}

export function useCarListings() {
  const [listings, setListings] = useState<CarListing[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`carListings_${address}`);
      if (stored) {
        try {
          const parsedListings = JSON.parse(stored);
          setListings(parsedListings);
        } catch (error) {
          console.error('Error loading car listings:', error);
        }
      }
    }
  }, [address]);

  const addListing = (tokenId: number, pricePerDay: number) => {
    if (!address) return;

    const newListing: CarListing = {
      tokenId,
      pricePerDay,
      active: true,
      listedAt: new Date(),
    };

    const updatedListings = [...listings.filter(l => l.tokenId !== tokenId), newListing];
    setListings(updatedListings);
    
    // Save to localStorage
    localStorage.setItem(`carListings_${address}`, JSON.stringify(updatedListings));
    localStorage.setItem(`carListing_${tokenId}`, JSON.stringify(newListing));
  };

  const removeListing = (tokenId: number) => {
    if (!address) return;

    const updatedListings = listings.filter(l => l.tokenId !== tokenId);
    setListings(updatedListings);
    
    // Update localStorage
    localStorage.setItem(`carListings_${address}`, JSON.stringify(updatedListings));
    localStorage.removeItem(`carListing_${tokenId}`);
  };

  const getListing = (tokenId: number) => {
    return listings.find(l => l.tokenId === tokenId);
  };

  return {
    listings,
    addListing,
    removeListing,
    getListing,
  };
}