// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import 'forge-std/console.sol';

contract QueueSession is IComponent {
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }

  function initialize(address game) external override {
    IGame(game).createEntity('QueueSessionEntity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function joinQueue(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    address player;
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');

    QueueSessionEntity(game.getEntity('nextPlayer')).enqueue(player);

    emit JoinedQueue(
      player,
      QueueSessionEntity(game.getEntity('nextPlayer')).getQueueSize()
    );
  }

  function setMatchOrWait(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    QueueSessionEntity queue = QueueSessionEntity(game.getEntity('nextPlayer'));

    if (queue.getQueueSize() == 0) {
      console.log('joining queue');
      joinQueue(executor, gameAddress);
      return;
    }

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    address player1 = gameEntity.getPlayerAddress(executor, 'player');
    address player2 = queue.nextPlayer();
    console.log('setting player one and two');

    gameEntity.addPlayerAddress(executor, 'player1', player1);
    gameEntity.addPlayerAddress(executor, 'player2', player2);

    emit MatchMade(player1, player2);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return QueueSessionEntity(game.getEntity('nextPlayer')).getQueueSize();
  }

  function isPlayerInQueue(
    IGame game,
    address player
  ) public view returns (bool) {
    return
      QueueSessionEntity(game.getEntity('nextPlayer')).isPlayerInQueue(player);
  }

  event JoinedQueue(address player, uint256 queueSize);
  event MatchMade(address player1, address player2);
}
