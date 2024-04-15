// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

contract MMOSessionModule is IModule{

  function initialize(address game) external {
        address roleEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'MMOSessionEntity');

    IGame(game).addEntity(roleEntity);
  }

  function getSummary() external view returns (ModuleSummary memory) {
    return ModuleSummary(address(this), new string[](0), new string[](0), 'Catch');
  }

  function joinSession(IGame game, address player) external {
    MMOSessionEntity(game.getEntity('players')).addPlayer(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }

}
