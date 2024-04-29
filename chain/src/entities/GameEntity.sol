// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './interfaces/IEntity.sol';
import {GameFuncParams, GameFuncAddress, GameFuncString, GameFuncUint, ParamType} from '../interfaces/IGame.sol';

import 'forge-std/console.sol';

contract GameEntity is IEntity {
  // mapping(address => GameFuncParams) private playerParams;
  mapping(address => mapping(string => string)) private strings;
  mapping(address => mapping(string => uint256)) private uints;
  mapping(address => mapping(string => address)) private addresses;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('playerParams');
  }

  function setPlayerParams(
    address player,
    GameFuncParams memory params
  ) external  {
    for (uint i = 0; i < params.strings.length; i++) {
      strings[player][params.strings[i].name] = params.strings[i].value;
    }
    for (uint i = 0; i < params.uints.length; i++) {
      uints[player][params.uints[i].name] = params.uints[i].value;
    }
    for (uint i = 0; i < params.addresses.length; i++) {
      addresses[player][params.addresses[i].name] = params.addresses[i].value;
      console.log("Setting address data for: ", player );
      console.log("Setting address data of: ", params.addresses[i].name, "with: ", params.addresses[i].value);
    }
  }

  function getPlayerString(address player, string memory key) external view returns (string memory) {
    return strings[player][key];
  }

  function getPlayerUint(address player, string memory key) external view returns (uint256) {
    return uints[player][key];
  }

  function getPlayerAddress(address player, string memory key) external view returns (address) {
    console.log("Getting address data for key: ", key, " of player ", player );
    console.log("which is: ", addresses[player][key]);
    return addresses[player][key];
  }

  // function getPlayerParams(
  //   address player, string memory key,  ParamType data
  // ) external view returns (GameFuncParams memory) {
  //   if (data == ParamType.STRING) {
  //     // console.log(strings[player][key]);
  //     return strings[player][key];
  //   } else if (data == ParamType.UINT) {
  //     // console.log('Getting uint data');
  //     // console.log(uints[player][key]);
  //     return uints[player][key];
  //   } else if (data == ParamType.ADDRESS) {
  //     // console.log('Getting address data');
  //     // console.log(addresses[player][key]);
  //     return addresses[player][key];
  //   }

  //   // return playerParams[player];
  // }
  
}
