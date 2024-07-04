// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './interfaces/IEntity.sol';
import {FlowParams, AddressKey, StringKey, UintKey, IGame} from '../interfaces/IGame.sol';


// import 'forge-std/console.sol';

contract FlowEntity is IEntity {
  mapping(address => mapping(string => string)) private strings;
  mapping(address => mapping(string => string[])) private stringArrays;
  mapping(address => mapping(string => uint256)) private uints;
  mapping(address => mapping(string => address)) private addresses;
  
  string public failure;
  bool public failureSet;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('playerParams');
  }

  function setPlayerParams(
    address player,
    FlowParams memory params
  ) external {
    string[] memory allKeys = new string[](params.strings.length + params.uints.length + params.addresses.length);
    for (uint i = 0; i < params.strings.length; i++) {
      strings[player][params.strings[i].name] = params.strings[i].value;
      allKeys[i] = params.strings[i].name;
    }
    for (uint i = 0; i < params.uints.length; i++) {
      uints[player][params.uints[i].name] = params.uints[i].value;
      allKeys[i + params.strings.length] = params.uints[i].name;
    }
    for (uint i = 0; i < params.addresses.length; i++) {
      addresses[player][params.addresses[i].name] = params.addresses[i].value;
      allKeys[i + params.strings.length + params.uints.length] = params.addresses[i].name;
    }
    stringArrays[player]["allInputKeys"] = allKeys;
  }

  // TODO only components and game can call these functions

  function addPlayerString(
    address player,
    string memory key,
    string memory value
  ) external onlyModuleOrGame(){
    strings[player][key] = value;
  }

  function addPlayerStringArray(
    address player,
    string memory key,
    string[] memory value
  ) external onlyModuleOrGame(){
    stringArrays[player][key] = value;
  }

  function getPlayerString(
    address player,
    string memory key
  ) external view returns (string memory) {
    return strings[player][key];
  }

  function getPlayerStringArray(
    address player,
    string memory key
  ) external view returns (string[] memory) {
    return stringArrays[player][key];
  }

  function getPlayerUint(
    address player,
    string memory key
  ) external view returns (uint256) {
    return uints[player][key];
  }

  function addPlayerUint(
    address player,
    string memory key,
    uint256 value
  ) external onlyModuleOrGame(){
    uints[player][key] = value;
  }

  function getPlayerAddress(
    address player,
    string memory key
  ) external view returns (address) {
    // console.log('Getting address data for key: ', key, ' of player ', player);
    // console.log('which is: ', addresses[player][key]);
    return addresses[player][key];
  }

  function addPlayerAddress(
    address player,
    string memory key,
    address value
  ) external onlyModuleOrGame(){
    addresses[player][key] = value;
  
  }

  function setFailure(string memory _failure) external {
    failure = _failure;
    failureSet = true;
  }

  function didFail() external view returns (bool) {
    return failureSet;
  }

  function getFailure() external view returns (string memory) {
    return failure;
  }

}
