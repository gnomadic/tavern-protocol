// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame, GameSummary, AddressKey, FlowParams} from './interfaces/IGame.sol';
import {IEntity} from './entities/interfaces/IEntity.sol';
import {IComponent} from './components/interfaces/IComponent.sol';
import {IEntityFactory} from './interfaces/IEntityFactory.sol';
import {FlowEntity} from './entities/FlowEntity.sol';

import 'forge-std/console.sol';

// Roles for access control
contract Game is IGame, Initializable {
  address public gm;
  string public displayName;
  string public description;
  string public gameUrl;
  IEntityFactory public entityFactory;

  IEntity[] public entities;
  IComponent[] public components;

  mapping(string => address) public availableEntityData;
  AddressKey[] dataKeys;

  mapping(string => address) public functionLookup;
  AddressKey[] functionKeys;
  mapping(address => string[]) public supportedFunctions;

  mapping(string => AddressKey[]) public flows;
  string[] public flowNames;

  function createEntity(string memory entityName) public returns (address) {
    address newEntity = entityFactory.createEntity(entityName);

    IEntity(newEntity).initialize(address(this));

    addEntity(newEntity);

    return newEntity;
  }

  function initialize(
    address _gm,
    string calldata _displayName,
    address _entityFactory
  ) public initializer {
    gm = _gm;
    displayName = _displayName;
    entityFactory = IEntityFactory(_entityFactory);

    FlowEntity flowEntity = new FlowEntity();
    entityFactory.registerEntity('FlowEntity', address(flowEntity));

    createEntity('FlowEntity');
  }

  function getSummary() external view returns (GameSummary memory) {
    return
      GameSummary(
        address(this),
        gm,
        displayName,
        description,
        gameUrl,
        functionKeys,
        dataKeys,
        flowNames
      );
  }

  function addEntity(address entity) internal {
    IEntity newEntity = IEntity(entity);

    string[] memory entityKey = newEntity.getAvailableKeys();

    for (uint8 i = 0; i < entityKey.length; i++) {
      dataKeys.push(AddressKey(entityKey[i], entity));
      availableEntityData[entityKey[i]] = entity;
    }
    entities.push(newEntity);
    // console.log("added entity", entity);
  }

  /// @notice This external function is called by apps or scripts to add a component to the game.
  /// @dev It will load every available function from the module and add it to the game's function lookup.
  /// @dev It will initiatlize the module for the game, so the module can create it's entities or whatever else it needs.
  /// @param component the address of the component to load.
  function addComponent(address component) external onlyGm(){
    // TODO verify the module exists in the registry for user safety
    IComponent newComponent = IComponent(component);
    string[] memory componentFunctions = newComponent.getSummary().functions;
    for (uint8 i = 0; i < componentFunctions.length; i++) {
      functionKeys.push(AddressKey(componentFunctions[i], component));
      functionLookup[componentFunctions[i]] = component;
      supportedFunctions[component].push(componentFunctions[i]);
    }
    newComponent.initialize(address(this));
    components.push(newComponent);
  }

  function getSupportedFunctions(
    address module
  ) external view returns (string[] memory) {
    return supportedFunctions[module];
  }

  function getEntity(string memory key) public view returns (address) {
    // console.log('getting entity', key);
    // console.log('entity is', availableEntityData[key]);
    return (availableEntityData[key]);
  }

  function validateIsModule(address module) external view returns (bool) {
    return (supportedFunctions[module].length > 0);
  }

  //TODO only GM can create game functions
  function createFlow(string memory name, AddressKey[] memory funcs) external onlyGm() {
    if (flows[name].length > 0) {
      revert FlowAlreadyExists();
    }
    for (uint8 i = 0; i < funcs.length; i++) {
      flows[name].push(funcs[i]);
    }
    flowNames.push(name);
  }

  function updateDescription(string memory _description) external onlyGm(){
    description = _description;
  }

  function updateGameUrl(string memory _gameUrl) external onlyGm() {
    gameUrl = _gameUrl;
  }

  error FlowAlreadyExists();
  error FlowDoesNotExist();

  function getFlows() external view returns (string[] memory) {
    return flowNames;
  }

  function executeFlow(string memory name, FlowParams memory params) external {
    AddressKey[] storage funcs = flows[name];
    if (funcs.length == 0) {
      revert FlowDoesNotExist();
    }

    FlowEntity(getEntity('playerParams')).setPlayerParams(msg.sender, params);

    for (uint8 i = 0; i < funcs.length; i++) {
      (bool success, ) = funcs[i].value.call(
        abi.encodeWithSignature(funcs[i].name, msg.sender, address(this))
      );
      if (!success) revert FlowExecutionError(funcs[i].value, funcs[i].name);
    }
  }
  error FlowExecutionError(address component, string functionKey);

  modifier onlyGm() {
    if (msg.sender != gm) revert OnlyGM();
    _;
  }
  error OnlyGM();
}
