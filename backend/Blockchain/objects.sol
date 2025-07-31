// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AutoChainObjects{
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

    struct ContactMessage { 
        uint256 contactId; 
        string firstName; 
        string lastName; 
        string email; 
        string phone; 
        string subject; 
        string message; 
        uint256 timestamp; 
    }

    CarRentalTransaction[] public transactionObjects;
    ContactMessage[] public contactMessageObjects;

    uint256 public totalTransactionObjects; 
    uint256 public totalContactMessageObjects;

    constructor(){
        totalTransactionObjects = 0;
        totalContactMessageObjects = 0;
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

    function createContactMessageObjects(
        uint256 id,
        string memory firstName, 
        string memory lastName, 
        string memory email, 
        string memory phone, 
        string memory subject, 
        string memory message, 
        uint256 timestamp
    )public returns (uint256){
        ContactMessage memory newObject = ContactMessage({contactId:id, firstName:firstName, lastName:lastName, email:email, phone:phone, subject:subject, message:message, timestamp:timestamp});
        contactMessageObjects.push(newObject);
        totalContactMessageObjects++;
        return totalContactMessageObjects;
    }

    function getAllTransactions() public view returns (CarRentalTransaction[] memory){
        return transactionObjects;
    }

    function getAllContactMessages() public view returns (ContactMessage[] memory){
        return contactMessageObjects;
    }

    // function updateObject (string memory email, string memory description, string memory name, uint256 startPrice,  uint256 startDate, uint256 endDate) external returns(bool){
    //     for(uint i = 0; i < TotalObjects; i++){
    //         if(compareStrings(Objects[i].email, email)){
    //             Objects[i].name = name;
    //             Objects[i].description = description;
    //             Objects[i].startPrice = startPrice;
    //             Objects[i].startDate = startDate;
    //             Objects[i].endDate = endDate;
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function delObject(string memory email)external returns(bool){
    //     assert(TotalObjects > 0);
    //     for(uint i = 0 ; i < TotalObjects; i++){
    //         if(compareStrings(Objects[i].email, email)){
    //             Objects[i] = Objects[TotalObjects - 1];
    //             delete Objects[TotalObjects - 1];
    //             TotalObjects--;
    //             return true;
    //         }

    //     }
    //     return false;
    // }

    
    // Helper functions
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}