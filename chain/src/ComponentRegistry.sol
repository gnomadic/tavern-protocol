// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './components/interfaces/IComponent.sol';
import {IComponentRegistry} from './interfaces/IComponentRegistry.sol';
import {AddressKey} from './interfaces/IGame.sol';

contract ComponentRegistry is IComponentRegistry {
  IComponent[] public registryKeys;
  AddressKey[] public alwaysRequired;

  address public admin;

  constructor() {
    admin = msg.sender;
  }

  function register(address module) public {
    if (msg.sender != admin) {
      revert NotAuthorized();
    }
    registryKeys.push(IComponent(module));

    emit ModuleRegistered(module);
  }

  function unRegister(address module) public {
    if (msg.sender != admin) {
      revert NotAuthorized();
    }
    for (uint256 i = 0; i < registryKeys.length; i++) {
      if (address(registryKeys[i]) == module) {
        delete registryKeys[i];
        break;
      }
    }
    emit ModeleUnregistered(module);
  }

  //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
  function getComponents(
    uint8 startAt
  ) external view returns (ComponentSummary[10] memory result) {
    uint8 pageSize = 10;

    for (
      uint8 i = startAt;
      i < registryKeys.length && i < (pageSize + startAt);
      i++
    ) {
      result[i] = registryKeys[i].getSummary();
    }
    return result;
  }

  function getComponentCount() external view returns (uint256) {
    return registryKeys.length;
  }

  function isRegistered(address module) external view returns (bool) {
    for (uint256 i = 0; i < registryKeys.length; i++) {
      if (address(registryKeys[i]) == module) {
        return true;
      }
    }
    return false;
  }

  function registerRequired(address module, string memory funct) public {
    if (msg.sender != admin) {
      revert NotAuthorized();
    }
    alwaysRequired.push(AddressKey(funct, module));
  }

  function getRequired() external view returns (AddressKey[] memory) {
    return alwaysRequired;
  }

  function isRequired(address module) external view returns (bool) {
    for (uint256 i = 0; i < alwaysRequired.length; i++) {
      if (alwaysRequired[i].value == module) {
        return true;
      }
    }
    return false;
  }

  event ModuleRegistered(address module);
  event ModeleUnregistered(address module);

  error NotAuthorized();
}
