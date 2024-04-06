// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// Imports

import {Initializable} from "solady/utils/Initializable.sol";

import {IGame, GameSummary, AddressKey} from "./interfaces/IGame.sol";
import {INumberEntity} from "./interfaces/INumberEntity.sol";
import {IModule} from "./interfaces/IModule.sol";

// Roles for access control
contract Game is IGame, Initializable {
    // ok so this contract will
    // 1. have a gm
    // 2. have a list of entities
    // 3. have a list of modules
    // 4. expose state from the entities

    address public gm;
    string public displayName;

    INumberEntity[] public entities;
    IModule[] public modules;

    mapping(string => address) public availableEntityData;
    AddressKey[] dataKeys;

    mapping(string => address) public availableFunctions;
    AddressKey[] functionKeys;

    function initialize(address _gm, string calldata _displayName) public initializer {
        gm = _gm;
        displayName = _displayName;
    }

    function getSummary() external view returns (GameSummary memory) {
        return GameSummary(address(this), gm, displayName, functionKeys, dataKeys);
    }

    function addEntity(address entity) external {
        INumberEntity newEntity = INumberEntity(entity);

        string[] memory entityNumbers = newEntity.getAvailableNumbers();
        for (uint8 i = 0; i < entityNumbers.length; i++) {
            dataKeys.push(AddressKey(entity, entityNumbers[i]));
            availableEntityData[entityNumbers[i]] = entity;
        }

        entities.push(newEntity);
    }

    function addModule(address module) public {
        IModule newModule = IModule(module);
        string[] memory moduleFunctions = newModule.getProvidedFunctions();
        for (uint8 i = 0; i < moduleFunctions.length; i++) {
            functionKeys.push(AddressKey(module, moduleFunctions[i]));
            availableFunctions[moduleFunctions[i]] = module;
        }
        newModule.initialize();
        modules.push(newModule);
    }

    function registerEntityData(address entity, string memory key) public {
        availableEntityData[key] = entity;
    }

    function getOwnedNumber(address player, uint256 tokenId, string memory key) external view returns (uint256) {
        INumberEntity targetEntity = INumberEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        return targetEntity.getNumber(tokenId, key);
    }

    function setOwnedNumber(address player, uint256 tokenId, string memory key, uint256 value) external {
        INumberEntity targetEntity = INumberEntity(availableEntityData[key]);
        targetEntity.assertOwnership(tokenId, player);
        targetEntity.updateNumber(tokenId, key, value);
    }
}
