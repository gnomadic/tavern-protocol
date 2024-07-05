// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract InputValidationEntity is IEntity {

  mapping(string => bool) private validInput;
  string[] private validKeys;


  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('inputValidation');

    addValidKeys("player");
    addValidKeys("action");
    
  }

  function addValidKeys(string memory key) public onlyModule {
    validInput[key] = true;
    validKeys.push(key);
  }

  function getValidKeys() public view returns (string[] memory) {
    return validKeys;
  }

  function validate(string[] memory keys) public view returns (bool) {
        console.log("InputValidationEntity.validate", validKeys.length);

    for (uint i = 0; i < keys.length; i++) {
      if (!validInput[keys[i]]) {
        return false;
      }
    }
    return true;
  }



}
