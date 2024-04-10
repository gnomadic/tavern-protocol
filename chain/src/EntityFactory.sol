// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {LibClone} from 'solady/utils/LibClone.sol';
import {UUPSUpgradeable} from 'solady/utils/UUPSUpgradeable.sol';
import {Initializable} from 'solady/utils/Initializable.sol';
import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';

import {IGame, GameSummary} from './interfaces/IGame.sol';
import {IEntity} from './entities/interfaces/IEntity.sol';
import {UnOptNumberEntity721} from '../src/entities/UnOptNumberEntity721.sol';
import 'forge-std/console.sol';

contract EntityFactory {
  //} is UUPSUpgradeable, Roles, Initializable {
  // contract GameFactory {
  address public entityContract;

  mapping(string => address) entities;
  // BasicEntity[] public entities;

  //TODO probalby don't need this because of update function
  function initialize(address _entityContract) public {
    entityContract = _entityContract;
  }

  function updateEntityContract(address _entityContract) public {
    //TODO permissions for admin
    entityContract = _entityContract;
  }

  function registerEntity(string memory name, address entityAt) external {
    entities[name] = entityAt;

    string[] memory keys = IEntity(entityAt).getAvailableKeys();
    // console.log('registering keys: %s', keys.length);
  }

  function createEntity(
    address _game,
    string calldata _entityName
  ) external returns (address) {
    if (entities[_entityName] == address(0)) revert EntityNotFound();

    address entity = LibClone.clone(entities[_entityName]);
    IEntity newEntity = IEntity(entity);
    newEntity.initialize(_game);

    // for (uint8 i = 0; i < numberKeys.length; i++) {
    //   basicEntity.createNumber(numberKeys[i]);
    // }

    IGame(_game).addEntity(entity);

    // entities.push(BasicEntity(entity));

    // Emit an event for successful entity creation
    // emit GameCreated(_gm, game);
    return entity;
  }

  error EntityNotFound();

  // //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
  // function getGames(uint8 startAt) external view returns (GameSummary[10] memory result) {
  //     uint8 pageSize = 10;
  //     // if (games.length < pageSize){
  //     //     for (uint8 i = 0; i < games.length; i++){
  //     //         result[i] = GameSummary(address(games[i]), games[i].gm(), games[i].displayName());
  //     //     }
  //     // }else{
  //     for (uint8 i = startAt; i < games.length && i < (pageSize + startAt); i++) {
  //         result[i] = games[i].getSummary();// GameSummary(address(games[i]), games[i].gm(), games[i].displayName());
  //     }
  //     // }

  //     return result;
  // }

  // function getGameCount() external view returns (uint256) {
  //     return games.length;
  // }

  // struct GameSummary {
  //     address game;
  //     address gm;
  //     string displayName;
  // }

  // event EntityCreated(address gm, address game);
  // }

  // function createEntity() public {
  //     // Deploy a minimal proxy clone of the Entity contract
  //     address entity = LibClone.deployProxy(entityContract, abi.encodeWithSelector(IEntity.initialize.selector, nftContract, tokenId));

  //     // Emit an event for successful entity creation
  //     emit EntityCreated(entity, nftContract, tokenId);

  // }
  // // Address of the upgradeable Entity contract
  // address public entityContract;

  // // Event emitted when a new entity is deployed
  // event EntityCreated(address entityAddress, address nftContract, uint256 tokenId);

  // constructor(address _entityContract) initializer public {
  //     entityContract = _entityContract;
  //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  // }

  // // Function to deploy a new entity proxy clone for an NFT
  // function createEntity(address nftContract, uint256 tokenId) public onlyRole(DM_ROLE) {
  //     // Deploy a minimal proxy clone of the Entity contract
  //     address entity = deployProxy(entityContract, abi.encodeWithSelector(IEntity.initialize.selector, nftContract, tokenId));

  //     // Emit an event for successful entity creation
  //     emit EntityCreated(entity, nftContract, tokenId);
  // }

  // // Fallback function to prevent accidental ETH transfers
  // fallback() external payable {
  //     revert("This contract does not accept ETH");
  // }

  // // Slither compatible upgrader function
  // function _authorizeUpgrade(address newImplementation)
  //     internal
  //     override
  //     onlyRole(DEFAULT_ADMIN_ROLE)
  // {}
}
