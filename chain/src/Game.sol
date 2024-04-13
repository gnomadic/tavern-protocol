// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// Imports

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame, GameSummary, AddressKey} from './interfaces/IGame.sol';
import {INumberEntity} from './entities/interfaces/INumberEntity.sol';
import {IEntity} from './entities/interfaces/IEntity.sol';
import {IModule} from './modules/interfaces/IModule.sol';

import 'forge-std/console.sol';

// Roles for access control
contract Game is IGame, Initializable {
  // ok so this contract will
  // 1. have a gm
  // 2. have a list of entities
  // 3. have a list of modules
  // 4. expose state from the entities

  address public gm;
  string public displayName;
  address public entityFactory;

  IEntity[] public entities;
  IModule[] public modules;

  mapping(string => address) public availableEntityData;
  AddressKey[] dataKeys;

  mapping(string => address) public availableFunctions;
  AddressKey[] functionKeys;

  function initialize(
    address _gm,
    string calldata _displayName,
    address _entityFactory
  ) public initializer {
    gm = _gm;
    displayName = _displayName;
    entityFactory = _entityFactory;
  }

  function getSummary() external view returns (GameSummary memory) {
    return GameSummary(address(this), gm, displayName, functionKeys, dataKeys);
  }

  function addEntity(address entity) external {
          
    IEntity newEntity = IEntity(entity);

    string[] memory entityKey = newEntity.getAvailableKeys();

    for (uint8 i = 0; i < entityKey.length; i++) {
      dataKeys.push(AddressKey(entity, entityKey[i]));
      availableEntityData[entityKey[i]] = entity;

    }
    entities.push(newEntity);
    console.log("added entity", entity);
  }

  function addModule(address module) external {
    IModule newModule = IModule(module);
    string[] memory moduleFunctions = newModule.getSummary().functions;
    for (uint8 i = 0; i < moduleFunctions.length; i++) {
      functionKeys.push(AddressKey(module, moduleFunctions[i]));
      availableFunctions[moduleFunctions[i]] = module;
    }
    newModule.initialize(address(this));
    modules.push(newModule);
  }

  function registerEntityData(address entity, string memory key) public {
    availableEntityData[key] = entity;
  }

  // function getOwnedNumber(address player, uint256 tokenId, string memory key) external view returns (uint256) {
  //     INumberEntity targetEntity = INumberEntity(availableEntityData[key]);
  //     targetEntity.assertOwnership(tokenId, player);
  //     return targetEntity.getNumber(tokenId, key);
  // }

  function getEntity(string memory key) external view returns (address) {
    console.log('getting entity', key);
    console.log('entity is', availableEntityData[key]);
    return (availableEntityData[key]);
  }

  function getEntityFactory() external view override returns (address) {
    return entityFactory;
  }
}
