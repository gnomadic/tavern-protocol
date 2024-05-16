// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGame {
  function initialize(
    address _gm,
    string calldata displayName,
    address entityFactory
  ) external;

  function createEntity(string memory name) external returns (address);
  function createFlow(string memory name, AddressKey[] memory funcs) external;

  function validateIsModule(address module) external view returns (bool);
  function getEntity(string memory key) external view returns (address);
}

struct GameSummary {
  address game;
  address gm;
  string metadata;
  address[] components;
  AddressKey[] availableData;
  string[] flows;
}

struct AddressKey {
  string name;
  address value;
}

struct UintKey {
  string name;
  uint256 value;
}

struct StringKey {
  string name;
  string value;
}

struct FlowParams {
  AddressKey[] addresses;
  UintKey[] uints;
  StringKey[] strings;
}
