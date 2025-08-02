import { parseEther, formatEther } from 'viem';

export interface RentalTransaction {
  carId: number;
  carName: string;
  renterAddress: string;
  ownerAddress: string;
  days: number;
  pricePerDay: string;
  totalPrice: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed';
  transactionHash?: string;
}

export class RentalService {
  static async processRental(
    carId: number,
    carName: string,
    days: number,
    pricePerDay: string,
    renterAddress: string
  ): Promise<RentalTransaction> {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
    const totalPriceWei = parseEther(pricePerDay) * BigInt(days);
    const totalPriceEth = formatEther(totalPriceWei);

    // Find car owner
    const ownerAddress = this.findCarOwner(carId);
    if (!ownerAddress) {
      throw new Error('Car owner not found');
    }

    const rental: RentalTransaction = {
      carId,
      carName,
      renterAddress,
      ownerAddress,
      days,
      pricePerDay,
      totalPrice: totalPriceEth,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active'
    };

    // Store rental information
    this.storeRentalInfo(rental);
    this.updateOwnerBookings(rental);
    this.updateCarStatus(carId, rental);

    return rental;
  }

  private static findCarOwner(carId: number): string | null {
    const allMintedCars = Object.keys(localStorage)
      .filter(key => key.startsWith('mintedCars_'))
      .map(key => ({ 
        address: key.replace('mintedCars_', ''), 
        cars: JSON.parse(localStorage.getItem(key) || '[]') 
      }))
      .find(data => data.cars.some((car: any) => car.tokenId === carId));

    return allMintedCars?.address || null;
  }

  private static storeRentalInfo(rental: RentalTransaction) {
    const rentalInfo = {
      renterAddress: rental.renterAddress,
      renterName: `${rental.renterAddress.slice(0, 6)}...${rental.renterAddress.slice(-4)}`,
      startDate: rental.startDate,
      endDate: rental.endDate,
      totalPrice: parseFloat(rental.totalPrice),
      totalEarnings: parseFloat(rental.totalPrice),
      totalBookings: 1,
      status: rental.status
    };

    localStorage.setItem(`carRental_${rental.carId}`, JSON.stringify(rentalInfo));
  }

  private static updateOwnerBookings(rental: RentalTransaction) {
    const ownerBookings = JSON.parse(
      localStorage.getItem(`ownerBookings_${rental.ownerAddress}`) || '[]'
    );

    const newBooking = {
      id: Date.now(),
      renter: `${rental.renterAddress.slice(0, 6)}...${rental.renterAddress.slice(-4)}`,
      car: rental.carName,
      startDate: new Date(rental.startDate).toLocaleDateString(),
      endDate: new Date(rental.endDate).toLocaleDateString(),
      price: parseFloat(rental.totalPrice),
      status: rental.status,
      tokenId: rental.carId
    };

    ownerBookings.unshift(newBooking);
    localStorage.setItem(`ownerBookings_${rental.ownerAddress}`, JSON.stringify(ownerBookings));
  }

  private static updateCarStatus(carId: number, rental: RentalTransaction) {
    // Update car earnings and booking count
    const ownerAddress = rental.ownerAddress;
    const mintedCars = JSON.parse(localStorage.getItem(`mintedCars_${ownerAddress}`) || '[]');
    
    const carIndex = mintedCars.findIndex((car: any) => car.tokenId === carId);
    if (carIndex !== -1) {
      mintedCars[carIndex].totalEarnings = (mintedCars[carIndex].totalEarnings || 0) + parseFloat(rental.totalPrice);
      mintedCars[carIndex].totalBookings = (mintedCars[carIndex].totalBookings || 0) + 1;
      localStorage.setItem(`mintedCars_${ownerAddress}`, JSON.stringify(mintedCars));
    }
  }

  static isCarRented(carId: number): boolean {
    const rentalData = localStorage.getItem(`carRental_${carId}`);
    if (!rentalData) return false;

    const rental = JSON.parse(rentalData);
    const endDate = new Date(rental.endDate);
    const now = new Date();

    return endDate > now;
  }

  static getCurrentRenter(carId: number): string | null {
    const rentalData = localStorage.getItem(`carRental_${carId}`);
    if (!rentalData) return null;

    const rental = JSON.parse(rentalData);
    const endDate = new Date(rental.endDate);
    const now = new Date();

    return endDate > now ? rental.renterAddress : null;
  }

  static getRentalEndDate(carId: number): Date | null {
    const rentalData = localStorage.getItem(`carRental_${carId}`);
    if (!rentalData) return null;

    const rental = JSON.parse(rentalData);
    return new Date(rental.endDate);
  }
}