import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CAR_NFT_ADDRESS, CAR_NFT_ABI } from '@/contracts/CarNFT';
import { CARS_FOR_RENT_ADDRESS, CARS_FOR_RENT_ABI } from '@/contracts/CarsForRent';
import { useState } from 'react';

export function useCarNFT() {
  const { writeContract } = useWriteContract();
  const [lastMintedTokenId, setLastMintedTokenId] = useState<number | null>(null);

  const mintCar = async (
    to: string,
    manufacturer: string,
    carType: string,
    fuelType: string,
    transmission: string,
    image: string,
    year: number
  ) => {
    try {
      const result = await writeContract({
        address: CAR_NFT_ADDRESS,
        abi: CAR_NFT_ABI,
        functionName: 'mint',
        args: [to, manufacturer, carType, fuelType, transmission, image, BigInt(year)]
      });
      
      // In a real implementation, you'd need to listen for the mint event to get the tokenId
      // For now, we'll increment a counter (this is not ideal for production)
      const estimatedTokenId = Date.now() % 10000; // Simple estimation
      setLastMintedTokenId(estimatedTokenId);
      
      return { hash: result, tokenId: estimatedTokenId };
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  };

  const listCar = async (tokenId: number, pricePerDay: string) => {
    return writeContract({
      address: CARS_FOR_RENT_ADDRESS,
      abi: CARS_FOR_RENT_ABI,
      functionName: 'listCar',
      args: [CAR_NFT_ADDRESS, BigInt(tokenId), BigInt(pricePerDay)]
    });
  };

  const rentCar = async (tokenId: number, numDays: number, totalPrice: string) => {
    return writeContract({
      address: CARS_FOR_RENT_ADDRESS,
      abi: CARS_FOR_RENT_ABI,
      functionName: 'rentCar',
      args: [CAR_NFT_ADDRESS, BigInt(tokenId), BigInt(numDays)],
      value: BigInt(totalPrice)
    });
  };

  return {
    mintCar,
    listCar,
    rentCar,
    lastMintedTokenId
  };
}

export function useCarMetadata(tokenId: number) {
  return useReadContract({
    address: CAR_NFT_ADDRESS,
    abi: CAR_NFT_ABI,
    functionName: 'getCarMetadata',
    args: [BigInt(tokenId)]
  });
}

export function useCarPrice(tokenId: number) {
  return useReadContract({
    address: CARS_FOR_RENT_ADDRESS,
    abi: CARS_FOR_RENT_ABI,
    functionName: 'getPrice',
    args: [CAR_NFT_ADDRESS, BigInt(tokenId)]
  });
}