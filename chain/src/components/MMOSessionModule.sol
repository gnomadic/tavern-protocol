// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

import {console} from 'forge-std/console.sol';

contract MMOSessionModule is IComponent {
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }

  function initialize(address game) external {
    IGame(game).createEntity('MMOSessionEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(address(this), metadata);
  }

  function joinGame(address executor, address gameAddress) public {
    address player;
    console.log('joining game');
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');
    // console.log('test', test);

    MMOSessionEntity(game.getEntity('players')).addPlayer(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }
}
