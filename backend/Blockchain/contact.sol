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
    )public returns (uint256){
        ContactMessage memory newObject = ContactMessage({contactId:id, firstName:firstName, lastName:lastName, email:email, phone:phone, subject:subject, message:message, timestamp:timestamp});
        contactMessageObjects.push(newObject);
        totalContactMessageObjects++;
        return totalContactMessageObjects;
    }


    function getAllContactMessages() public view returns (ContactMessage[] memory){
        return contactMessageObjects;
    }


}