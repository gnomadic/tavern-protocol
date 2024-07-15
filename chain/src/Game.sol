// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame, GameSummary, AddressKey, FlowParams, FlowKey} from './interfaces/IGame.sol';
import {IEntity} from './entities/interfaces/IEntity.sol';
import {IComponent, ComponentSummary} from './components/interfaces/IComponent.sol';
import {IEntityFactory} from './interfaces/IEntityFactory.sol';
import {FlowEntity} from './entities/FlowEntity.sol';
import {IComponentRegistry} from './interfaces/IComponentRegistry.sol';

import {console} from 'forge-std/console.sol';

// Roles for access control
contract Game is IGame, Initializable {
  address public gm;
  string public metadata;
  IEntityFactory public entityFactory;
  address public gameFactory;
  address public componentRegistry;

  IEntity[] public entities;
  address[] public components;

  mapping(string => address) public availableEntityData;
  AddressKey[] dataKeys;

  mapping(string => AddressKey[]) public flows;
  string[] public flowNames;

  function createEntity(string memory entityName) public returns (address) {
    address newEntity = entityFactory.createEntity(entityName);

    IEntity(newEntity).initialize(address(this));

    addEntity(newEntity);

    return newEntity;
  }

  function initialize(
    address _gameFactory,
    address _componentRegsitry,
    address _gm,
    string calldata _metadata,
    address _entityFactory
  ) public initializer {
    gameFactory = _gameFactory;
    componentRegistry = _componentRegsitry;
    gm = _gm;
    metadata = _metadata;
    entityFactory = IEntityFactory(_entityFactory);

    AddressKey[] memory required = IComponentRegistry(_componentRegsitry)
      .getRequired();
    for (uint8 i = 0; i < required.length; i++) {
      addComponent(required[i].value);
    }

    FlowEntity flowEntity = new FlowEntity();
    entityFactory.registerEntity('FlowEntity', address(flowEntity));

    createEntity('FlowEntity');
  }

  function getSummary() external view returns (GameSummary memory) {
    FlowKey[] memory flowKeys = new FlowKey[](flowNames.length);
    for (uint8 i = 0; i < flowNames.length; i++) {
      flowKeys[i] = FlowKey(flowNames[i], flows[flowNames[i]]);
    }

    ComponentSummary[] memory componentMetadata = new ComponentSummary[](
      components.length
    );
    for (uint8 i = 0; i < components.length; i++) {
      IComponent component = IComponent(components[i]);
      componentMetadata[i] = component.getSummary();
    }

    return
      GameSummary(
        address(this),
        gm,
        metadata,
        components,
        componentMetadata,
        dataKeys,
        flowKeys
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
  function addComponent(address component) public onlyGMOrFactory {
    // TODO verify the module exists in the registry for user safety

    IComponent newComponent = IComponent(component);
    components.push(component);
    newComponent.initialize(address(this));
  }

  function getEntity(string memory key) public view returns (address) {
    // console.log('getting entity', key);
    // console.log('entity is', availableEntityData[key]);
    return (availableEntityData[key]);
  }

  function validateIsModule(address module) external view returns (bool) {
    for (uint8 i = 0; i < components.length; i++) {
      if (address(components[i]) == module) {
        return true;
      }
    }
    return false;
  }

  function createFlow(
    string memory name,
    AddressKey[] memory funcs
  ) external onlyGm {
    if (flows[name].length > 0) {
      revert FlowAlreadyExists();
    }

    AddressKey[] memory required = IComponentRegistry(componentRegistry)
      .getRequired();

    console.log('required length', required.length);

    for (uint8 i = 0; i < required.length; i++) {
      flows[name].push(required[i]);
      console.log('required', required[i].name);
    }

    for (uint8 i = 0; i < funcs.length; i++) {
      flows[name].push(funcs[i]);
    }
    flowNames.push(name);
  }

  function updateMetadata(string memory _metadata) external onlyGm {
    metadata = _metadata;
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

    // params.add

    FlowEntity(getEntity('playerParams')).setPlayerParams(msg.sender, params);

    // TODO this will break with cross-chain relays
    FlowEntity(getEntity('playerParams')).addPlayerAddress(
      msg.sender,
      'player',
      msg.sender
    );

    for (uint8 i = 0; i < funcs.length; i++) {
      (bool success, ) = funcs[i].value.call(
        abi.encodeWithSignature(funcs[i].name, msg.sender, address(this))
      );
      if (!success) {
        console.log('Execution failed');
        revert FlowExecutionError(funcs[i].value, funcs[i].name);
      } else {
        console.log('Execution success');
      }
      if (FlowEntity(getEntity('playerParams')).didFail()) {
        revert FlowFailure(
          funcs[i].value,
          funcs[i].name,
          FlowEntity(getEntity('playerParams')).getFailure()
        );
      }
    }
  }
  error FlowExecutionError(address component, string functionKey);
  error FlowFailure(address component, string functionkey, string failure);

  function isGM(address account) external view override returns (bool) {
    return account == gm;
  }

  modifier onlyGm() {
    if (msg.sender != gm) revert OnlyGM();
    _;
  }
  error OnlyGM();

  modifier onlyGMOrFactory() {
    if (msg.sender != gm && msg.sender != gameFactory) revert OnlyGM();
    _;
  }
}
