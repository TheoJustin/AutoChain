// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DeAuctionObjects{
    struct object{
        string name; 
        string description;
        string email;
    }

    object[] public Objects;
    uint256 public TotalObjects; 

    constructor(){
        TotalObjects = 0;
    }

    function createObject (string memory name, string memory description, string memory email) public returns (uint256){
        object memory newObject = object(name, description, email);
        Objects.push(newObject);
        TotalObjects++;
        return TotalObjects;
    }

    function updateObject (string memory email, string memory description, string memory name) external returns(bool){
        for(uint i = 0; i < TotalObjects; i++){
            if(compareStrings(Objects[i].email, email)){
                Objects[i].name = name;
                Objects[i].description = description;
                return true;
            }
        }
        return false;
    }

    function delObject(string memory email)external returns(bool){
        assert(TotalObjects > 0);
        for(uint i = 0 ; i < TotalObjects; i++){
            if(compareStrings(Objects[i].email, email)){
                Objects[i] = Objects[TotalObjects - 1];
                delete Objects[TotalObjects - 1];
                TotalObjects--;
                return true;
            }

        }
        return false;
    }

    
    // Helper functions
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}