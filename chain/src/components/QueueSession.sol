// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';

contract QueueSession is IComponent {
  string[] public required = ['players'];
  string[] public functions = ['joinGame'];

  function initialize(address game) external {
    IGame(game).createEntity('QueueSessionEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(address(this), functions, required, 'Queue Session');
  }

  function executeFunction(
    address game,
    string calldata func,
    GameFuncParams calldata params
  ) external {
    if (
      keccak256(abi.encodePacked(func)) ==
      keccak256(abi.encodePacked('joinGame'))
    ) {
      joinGame(IGame(game), params);
    }
  }



  function joinGame(IGame game, GameFuncParams calldata params) internal {
    address player;
    for (uint256 i = 0; i < params.addresses.length; i++) {
      if (
        keccak256(abi.encodePacked(params.addresses[i].name)) ==
        keccak256(abi.encodePacked('player'))
      ) {
        player = params.addresses[i].value;
      }
    }

    QueueSessionEntity(game.getEntity('players')).enqueue(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return QueueSessionEntity(game.getEntity('players')).getQueueSize();
  }
}
