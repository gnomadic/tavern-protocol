// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import {console} from 'forge-std/Console.sol';

contract QueueSession is IComponent {
  string[] public required = ['playerParams', 'nextPlayer'];
  string[] public functions = ['joinGame', 'setMatchOrWait'];
  string[] public abis = [
    'joinGame(address,address)',
    'setMatchOrWait(address,address)'
  ];

  function initialize(address game) external {
    IGame(game).createEntity('QueueSessionEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(
        address(this),
        functions,
        abis,
        required,
        'Queue Session'
      );
  }

  function joinGame(address executor, address gameAddress) public {
    address player;
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');

    QueueSessionEntity(game.getEntity('nextPlayer')).enqueue(player);
  }

  function setMatchOrWait(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);
    QueueSessionEntity queue = QueueSessionEntity(game.getEntity('nextPlayer'));

    if (queue.getQueueSize() == 0) {
      joinGame(executor, gameAddress);
      return;
    }
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    address player1 = gameEntity.getPlayerAddress(executor, 'player');
    address player2 = queue.nextPlayer();

    // console.log('Matched players: ', player1, player2);
    // console.log("with execu", executor);

    gameEntity.addPlayerAddress(executor, 'player1', player1);
    gameEntity.addPlayerAddress(executor, 'player2', player2);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return QueueSessionEntity(game.getEntity('nextPlayer')).getQueueSize();
  }
}
