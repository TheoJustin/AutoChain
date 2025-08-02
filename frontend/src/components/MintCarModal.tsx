"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCarNFT } from '@/hooks/useCarNFT';
import { useMintedCars } from '@/hooks/useMintedCars';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';

interface MintCarModalProps {
  children: React.ReactNode;
}

export function MintCarModal({ children }: MintCarModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    manufacturer: '',
    carType: '',
    fuelType: '',
    transmission: '',
    year: new Date().getFullYear(),
    pricePerDay: ''
  });
  
  const { mintCar, listCar } = useCarNFT();
  const { addMintedCar } = useMintedCars();
  const { address, isConnected } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) return;

    try {
      // Mint the NFT
      const mintResult = await mintCar(
        address,
        formData.manufacturer,
        formData.carType,
        formData.fuelType,
        formData.transmission,
        '/placeholder.svg',
        formData.year
      );

      // List the car for rent if price is provided
      if (formData.pricePerDay && mintResult.tokenId !== undefined) {
        const priceInWei = parseEther(formData.pricePerDay);
        await listCar(mintResult.tokenId, priceInWei.toString());
      }

      // Add to minted cars list
      if (mintResult.tokenId !== undefined) {
        addMintedCar({
          manufacturer: formData.manufacturer,
          carType: formData.carType,
          fuelType: formData.fuelType,
          transmission: formData.transmission,
          year: formData.year,
          pricePerDay: formData.pricePerDay,
          tokenId: mintResult.tokenId
        });
      }

      alert(`Car NFT minted successfully! ${mintResult.tokenId !== undefined ? `Token ID: ${mintResult.tokenId}` : ''}`);
      
      setIsOpen(false);
      setFormData({
        manufacturer: '',
        carType: '',
        fuelType: '',
        transmission: '',
        year: new Date().getFullYear(),
        pricePerDay: ''
      });
    } catch (error) {
      console.error('Failed to mint car:', error);
      alert('Failed to mint car. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mint Car NFT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              value={formData.manufacturer}
              onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="carType">Car Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, carType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, fuelType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Gasoline">Gasoline</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <Select onValueChange={(value) => setFormData({...formData, transmission: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              required
            />
          </div>

          <div>
            <Label htmlFor="pricePerDay">Price per Day (ETH)</Label>
            <Input
              id="pricePerDay"
              type="number"
              step="0.001"
              min="0"
              value={formData.pricePerDay}
              onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
              placeholder="0.1"
            />
          </div>

          <Button 
            type="submit" 
            disabled={!isConnected}
            className="w-full"
          >
            {!isConnected ? 'Connect Wallet' : 'Mint Car NFT'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}