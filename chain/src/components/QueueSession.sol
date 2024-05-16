// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary, GameFunction, ConfigFunction} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import 'forge-std/console.sol';

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

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    (
      GameFunction[] memory gameFunctions,
      ConfigFunction[] memory configFunctions
    ) = prepare();
    return
      ComponentSummary(
        address(this),
        'Queue Session',
        'Allow players to join a queue and match with other players',
        gameFunctions,
        configFunctions
      );
  }

  function prepare()
    internal
    pure
    returns (GameFunction[] memory, ConfigFunction[] memory)
  {
    GameFunction[] memory gameFunctions = new GameFunction[](1);
    ConfigFunction[] memory configFunctions = new ConfigFunction[](0);

    string[] memory required = new string[](1);
    required[0] = 'tokenId';
    string[] memory creates = new string[](2);
    creates[0] = 'dailyAction';
    creates[1] = 'lastActionAt';

    GameFunction memory first = GameFunction(
      'Daily Interaction',
      'dailyInteraction(address,address)',
      required,
      creates
    );

    gameFunctions[0] = first;

    return (gameFunctions, configFunctions);
  }

  function joinGame(address executor, address gameAddress) public {
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

  function setMatchOrWait(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);
    QueueSessionEntity queue = QueueSessionEntity(game.getEntity('nextPlayer'));

    if (queue.getQueueSize() == 0) {
      console.log('joining queue');
      joinGame(executor, gameAddress);
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

  event JoinedQueue(address player, uint256 queueSize);
  event MatchMade(address player1, address player2);
}
