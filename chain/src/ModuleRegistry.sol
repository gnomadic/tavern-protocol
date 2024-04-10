// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "solady/utils/Initializable.sol";

import {IModule, ModuleSummary} from "./modules/interfaces/IModule.sol";

contract ModuleRegistry is Initializable {
    IModule[] registryKeys;

    function initialize() public initializer {}

    function register(address module) public {
        registryKeys.push(IModule(module));

        emit ModuleRegistered(module);
    }

      //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
    function getModules(uint8 startAt) external view returns (ModuleSummary[10] memory result) {
        uint8 pageSize = 10;
   
        for (uint8 i = startAt; i < registryKeys.length && i < (pageSize + startAt); i++) {
            result[i] = registryKeys[i].getSummary();
        }
        return result;
    }

    function getModuleCount() external view returns (uint256) {
        return registryKeys.length;
    }

    event ModuleRegistered(address module);
}
