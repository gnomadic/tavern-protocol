// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGame {
  function initialize(address _gm, string calldata displayName, address entityFactory) external;
  function getSummary() external view returns (GameSummary memory);
  function addEntity(address entity) external;
  function getEntity(string memory key) external view returns (address);
  function addModule(address module) external;
  function getEntityFactory() external view returns (address);
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
