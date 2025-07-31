// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TransactionObjects{
   struct CarRentalTransaction {
        uint256 transactionId;   
        uint256 carId;           
        string renterName;       
        string renterEmail;      
        string renterProviderName;
        string renterProviderEmail;
        uint256 startDate;       
        uint256 endDate;         
        uint256 totalPrice;  
    }

    CarRentalTransaction[] public transactionObjects;

    uint256 public totalTransactionObjects; 

    constructor(){
        totalTransactionObjects = 0;
    }

    function createTransactionObject (
        uint256 carId,           
        string memory renterName,       
        string memory renterEmail,  
        string memory renterProviderName,
        string memory renterProviderEmail,    
        uint256 startDate,       
        uint256 endDate,         
        uint256 totalPrice  
    ) public returns (uint256){
        CarRentalTransaction memory newObject = 
        CarRentalTransaction({transactionId:totalTransactionObjects, carId:carId, renterName:renterName, renterEmail:renterEmail, renterProviderName: renterProviderName, renterProviderEmail:renterProviderEmail,startDate:startDate, endDate:endDate, totalPrice:totalPrice});
        transactionObjects.push(newObject);
        totalTransactionObjects++;
        return totalTransactionObjects;
    }

    function getAllTransactions() public view returns (CarRentalTransaction[] memory){
        return transactionObjects;
    }
    
    // Helper functions
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}