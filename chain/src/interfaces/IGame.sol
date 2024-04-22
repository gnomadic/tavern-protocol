// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGame {
  function initialize(
    address _gm,
    string calldata displayName,
    address entityFactory
  ) external;
  function getSummary() external view returns (GameSummary memory);
  function addEntity(address entity) external;
  function getEntity(string memory key) external view returns (address);
  function addModule(address module) external;
  function getEntityFactory() external view returns (address);
  function getSupportedFunctions(
    address module
  ) external view returns (string[] memory);
  function getModule(string memory key) external view returns (address);

    function createGameFunction(string memory name, AddressKey[] memory funcs ) external ;
      function executeGameFunction(string memory name, GameFuncData memory params) external ;

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

// struct GameFuncRawParam{
//   string name;
//   bytes value;
//   ParamType paramType;
// }

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

struct GameFuncData {
  GameFuncAddress[] addresses;
  GameFuncUint[] uints;
  GameFuncString[] strings;
}


// struct GameFuncParam {
//   mapping(string => address) addresses;
//   mapping(string => uint256) uints;
//   mapping(string => string) strings;
// }

enum ParamType {
  STRING,
  UINT,
  ADDRESS
}
