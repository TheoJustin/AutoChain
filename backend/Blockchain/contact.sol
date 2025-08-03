// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ContactObjects{
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

    ContactMessage[] public contactMessageObjects;
    uint256 public totalContactMessageObjects;

    event ContactMessageCreated(uint256 indexed contactId, string email, uint256 timestamp);

    constructor(){
        totalContactMessageObjects = 0;
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
    ) public returns (uint256){
        require(bytes(firstName).length > 0, "First name required");
        require(bytes(email).length > 0, "Email required");
        require(timestamp > 0, "Timestamp required");
        
        ContactMessage memory newObject = ContactMessage({
            contactId: id, 
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phone: phone, 
            subject: subject, 
            message: message, 
            timestamp: timestamp
        });
        
        contactMessageObjects.push(newObject);
        totalContactMessageObjects++;
        
        emit ContactMessageCreated(id, email, timestamp);
        return totalContactMessageObjects;
    }

    function getAllContactMessages() public view returns (ContactMessage[] memory){
        return contactMessageObjects;
    }

    function getContactMessage(uint256 index) public view returns (ContactMessage memory){
        require(index < contactMessageObjects.length, "Index out of bounds");
        return contactMessageObjects[index];
    }

    function getContactMessagesCount() public view returns (uint256){
        return contactMessageObjects.length;
    }
}