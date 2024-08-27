// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract FlipCoin {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _guess) public payable returns (bool) {
        require(msg.value > 0, "You must send some Ether to play");

        // More secure way to generate pseudo-randomness
        bool result = (block.difficulty + block.timestamp + uint256(keccak256(abi.encodePacked(msg.sender)))) % 2 == 0;

        if (_guess == result) {
            // Safe transfer using call
            (bool success, ) = payable(msg.sender).call{value: msg.value * 2}("");
            require(success, "Transfer failed.");
            return true;
        }

        return false;
    }
}
