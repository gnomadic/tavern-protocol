// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {GameEntity} from '../entities/GameEntity.sol';

contract QueueSession is IComponent {
  string[] public required = ['players'];
  string[] public functions = ['joinGame'];
    string[] public abis = ['dailyInteraction(address,address)'];


  function initialize(address game) external {
    IGame(game).createEntity('QueueSessionEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(address(this), functions,abis, required, 'Queue Session');
  }

  // function executeFunction(
  //   address executor,
  //   address game,
  //   string calldata func,
  //   GameFuncParams calldata params
  // ) external {
  //   if (
  //     keccak256(abi.encodePacked(func)) ==
  //     keccak256(abi.encodePacked('joinGame'))
  //   ) {
  //     // joinGame(IGame(game), params);
  //           (bool success, ) = address(this).call(
  //       abi.encodeWithSignature(
  //         'joinGame(address,address)',
  //         executor,
  //         game
  //       )
  //     );
  //   }
  // }



  function joinGame(address executor, address gameAddress) internal {
    address player;
    IGame game = IGame(gameAddress);

    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');
    // for (uint256 i = 0; i < params.addresses.length; i++) {
    //   if (
    //     keccak256(abi.encodePacked(params.addresses[i].name)) ==
    //     keccak256(abi.encodePacked('player'))
    //   ) {
    //     player = params.addresses[i].value;
    //   }
    // }

    QueueSessionEntity(game.getEntity('players')).enqueue(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return QueueSessionEntity(game.getEntity('players')).getQueueSize();
  }
}
