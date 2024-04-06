// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGame {
    function initialize(address _gm, string calldata displayName) external;
    function getSummary() external view returns (GameSummary memory);
    function addEntity(address entity) external;
    function getOwnedNumber(address player, uint256 tokenId, string memory key) external view returns (uint256);
    function setOwnedNumber(address player, uint256 tokenId, string memory key, uint256 value) external;
}

struct GameSummary {
    address game;
    address gm;
    string displayName;
    AddressKey[] availableFunctions;
    AddressKey[] availableData;
}

struct AddressKey {
    address Address;
    string Key;
}
