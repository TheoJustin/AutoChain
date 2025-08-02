// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Shows ownership of a car
// Allows for other people to rent the car
// The car NFT is designed so that it's reusable in other platforms

contract CarNFT is ERC721 {
    struct Rental {
        address user;
        uint64 expires;
    }

    struct CarMetadata {
        string manufacturer;
        string carType;
        string fuelType;
        string transmission;
        string image;
        uint256 year;
    }

    mapping(uint256 => Rental) private _rentals;
    mapping(uint256 => CarMetadata) private _carData;
    uint256 private _nextTokenId;

    constructor() ERC721("CarNFT", "CAR") {}

    function mint(
        address to,
        string memory manufacturer,
        string memory carType,
        string memory fuelType,
        string memory transmission,
        string memory image,
        uint256 year
    ) external {
        _mint(to, _nextTokenId);
        _carData[_nextTokenId] = CarMetadata(manufacturer, carType, fuelType, transmission, image, year);
    }

    function rentOut(uint256 tokenId, address user, uint64 duration) external {
        require(ownerOf(tokenId) == msg.sender, "Not NFT owner");
        _rentals[tokenId] = Rental(user, uint64(block.timestamp + duration));
    }

    function currentUser(uint256 tokenId) public view returns (address) {
        Rental memory rental = _rentals[tokenId];
        if (block.timestamp <= rental.expires) {
            return rental.user;
        }
        return ownerOf(tokenId);
    }

    function rentalExpires(uint256 tokenId) public view returns (uint64) {
        return _rentals[tokenId].expires;
    }

    function getCarMetadata(uint256 tokenId) public view returns (
        string memory manufacturer,
        string memory carType,
        string memory fuelType,
        string memory transmission,
        uint256 year
    ) {
        CarMetadata memory data = _carData[tokenId];
        return (data.manufacturer, data.carType, data.fuelType, data.transmission, data.year);
    }
}
