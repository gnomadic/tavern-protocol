// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGame {

  function initialize(
    address _gm,
    string calldata displayName,
    address entityFactory
  ) external;


  function createEntity(string memory name) external returns (address);
  function createGameFunction(
    string memory name,
    AddressKey[] memory funcs
  ) external;

  function validateIsModule(address module) external view returns (bool);

  
  function getEntity(string memory key) external view returns (address);
  

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



struct GameFuncAddress {
  string name;
  address value;
}

struct GameFuncUint {
  string name;
  uint256 value;
}

struct GameFuncString {
  string name;
  string value;
}

struct GameFuncParams {
  GameFuncAddress[] addresses;
  GameFuncUint[] uints;
  GameFuncString[] strings;
}


enum ParamType {
  STRING,
  UINT,
  ADDRESS
}
