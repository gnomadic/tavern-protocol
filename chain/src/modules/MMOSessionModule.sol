// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncData, GameFuncUint} from '../interfaces/IGame.sol';

contract MMOSessionModule is IModule {
  string[] public required = ['players'];
  string[] public functions = ['joinGame'];

  function initialize(address game) external {
    address roleEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'MMOSessionEntity');

    IGame(game).addEntity(roleEntity);
  }

  function getSummary() external view returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, 'MMO Session');
  }

  function executeFunction(
    address game,
    string calldata func,
    GameFuncData calldata params
  ) external {
    if (
      keccak256(abi.encodePacked(func)) ==
      keccak256(abi.encodePacked('joinGame'))
    ) {
      joinGame(IGame(game), params);
    }
  }

  function joinGame(IGame game, GameFuncData calldata params) internal {
    address player;
    for (uint256 i = 0; i < params.addresses.length; i++) {
      if (
        keccak256(abi.encodePacked(params.addresses[i].name)) ==
        keccak256(abi.encodePacked('player'))
      ) {
        player = params.addresses[i].value;
      }
    }

    MMOSessionEntity(game.getEntity('players')).addPlayer(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }
}
