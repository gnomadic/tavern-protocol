// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// Imports

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame, GameSummary, AddressKey, GameFuncData} from './interfaces/IGame.sol';
import {INumberEntity} from './entities/interfaces/INumberEntity.sol';
import {IEntity} from './entities/interfaces/IEntity.sol';
import {IModule} from './modules/interfaces/IModule.sol';

import 'forge-std/console.sol';

// Roles for access control
contract Game is IGame, Initializable {

  address public gm;
  string public displayName;
  address public entityFactory;

  IEntity[] public entities;
  IModule[] public modules;

  mapping(string => address) public availableEntityData;
  AddressKey[] dataKeys;

  mapping(string => address) public functionLookup;
  AddressKey[] functionKeys;
  mapping(address => string[]) public supportedFunctions;

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
    // console.log("added entity", entity);
  }

  function addModule(address module) external {
    IModule newModule = IModule(module);
    string[] memory moduleFunctions = newModule.getSummary().functions;
    for (uint8 i = 0; i < moduleFunctions.length; i++) {
      functionKeys.push(AddressKey(module, moduleFunctions[i]));
      functionLookup[moduleFunctions[i]] = module;
      supportedFunctions[module].push(moduleFunctions[i]);
    }
    newModule.initialize(address(this));
    modules.push(newModule);
  }

  function registerEntityData(address entity, string memory key) public {
    availableEntityData[key] = entity;
  }

  function getSupportedFunctions(address module) external view returns (string[] memory) {
    return supportedFunctions[module];
  }

  function getEntity(string memory key) external view returns (address) {
    // console.log('getting entity', key);
    // console.log('entity is', availableEntityData[key]);
    return (availableEntityData[key]);
  }

  function getEntityFactory() external view override returns (address) {
    return entityFactory;
  }

  function getModule(string memory key) external view returns (address){
    return functionLookup[key];
  }

  mapping (string => AddressKey[]) public gameFunctions;
  string[] public gameFunctionNames;


//TODO only GM can create game functions
  function createGameFunction(string memory name, AddressKey[] memory funcs ) external {
    if (gameFunctions[name].length > 0) {
      revert GameFunctionAlreadyExists();
    }
    for (uint8 i = 0; i < funcs.length; i++) {
      gameFunctions[name].push(funcs[i]);
    }
    gameFunctionNames.push(name);
  }

  error GameFunctionAlreadyExists();
  error GameFunctionDoesNotExist();

  function getGameFunctions() external view returns (string[] memory) {
    return gameFunctionNames;
  }


  function executeGameFunction(string memory name, GameFuncData memory params) external {
    AddressKey[] storage funcs = gameFunctions[name];
    if (funcs.length == 0) {
      revert GameFunctionDoesNotExist();
    }

    for (uint8 i = 0; i < funcs.length; i++) {
      IModule(funcs[i].Address).executeFunction(address(this), funcs[i].Key, params);
    }
  }

  
}
