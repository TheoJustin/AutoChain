// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ContactObjects {
    struct ContactMessage {
        uint256 contactId;
        string firstName;
        string email;
        string message;
        uint256 timestamp;
    }

    mapping(uint256 => ContactMessage) private messages;
    uint256 public totalMessages;

    event ContactCreated(uint256 indexed id);

    function createContactMessage(
        string memory firstName,
        string memory email,
        string memory message
    ) external returns (uint256) {
        require(bytes(firstName).length > 0, "Name required");
        require(bytes(email).length > 0, "Email required");
        require(totalMessages < 50, "Max limit reached");

        totalMessages++;
        messages[totalMessages] = ContactMessage(
            totalMessages,
            firstName,
            email,
            message,
            block.timestamp
        );

        emit ContactCreated(totalMessages);
        return totalMessages;
    }

    function getMessageData(uint256 id)
        public
        view
        returns (uint256, string memory, string memory, string memory, uint256)
    {
        require(id > 0 && id <= totalMessages, "Invalid id");
        ContactMessage memory msgObj = messages[id];
        return (
            msgObj.contactId,
            msgObj.firstName,
            msgObj.email,
            msgObj.message,
            msgObj.timestamp
        );
    }

    function totalContactMessageObjects() external view returns (uint256) {
        return totalMessages;
    }
}
