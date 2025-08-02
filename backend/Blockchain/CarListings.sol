// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ICarNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function rentOut(uint256 tokenId, address user, uint64 duration) external;
}

contract CarsForRent {
    struct Listing {
        address nftAddress;
        uint256 pricePerDay; // in wei
        bool active;
    }

    // nftAddress => tokenId => Listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    function listCar(address nftAddress, uint256 tokenId, uint256 pricePerDay) external {
        require(ICarNFT(nftAddress).ownerOf(tokenId) == msg.sender, "Not car owner");
        listings[nftAddress][tokenId] = Listing(nftAddress, pricePerDay, true);
    }

    function unlistCar(address nftAddress, uint256 tokenId) external {
        require(ICarNFT(nftAddress).ownerOf(tokenId) == msg.sender, "Not car owner");
        delete listings[nftAddress][tokenId];
    }

    function rentCar(address nftAddress, uint256 tokenId, uint64 numDays) external payable {
        Listing memory listing = listings[nftAddress][tokenId];
        require(listing.active, "Car not listed");
        uint256 totalPrice = listing.pricePerDay * numDays;
        require(msg.value >= totalPrice, "Insufficient payment");

        address owner = ICarNFT(nftAddress).ownerOf(tokenId);
        ICarNFT(nftAddress).rentOut(tokenId, msg.sender, numDays * 1 days);

        payable(owner).transfer(totalPrice);
    }

    function getPrice(address nftAddress, uint256 tokenId) external view returns (uint256) {
        return listings[nftAddress][tokenId].pricePerDay;
    }
}
