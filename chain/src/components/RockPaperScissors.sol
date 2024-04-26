// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {RockPaperScissorEntity} from '../entities/RockPaperScissorEntity.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';

import {console} from 'forge-std/console.sol';

contract RockPaperScissors is IComponent {
  string[] public required = ['nextPlayer'];
  string[] public functions = ['joinGame'];

  function initialize(address game) external {
    IGame(game).createEntity('RockPaperScissorEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(
        address(this),
        functions,
        required,
        'Rock Paper Scissors'
      );
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

  function oneOnOne(IGame game, GameFuncParams calldata params) internal {
    address player;
    uint256 action;
    for (uint256 i = 0; i < params.addresses.length; i++) {
      if (
        keccak256(abi.encodePacked(params.addresses[i].name)) ==
        keccak256(abi.encodePacked('player'))
      ) {
        player = params.addresses[i].value;
      }
    }

    for (uint256 i = 0; i < params.uints.length; i++) {
      if (
        keccak256(abi.encodePacked(params.uints[i].name)) ==
        keccak256(abi.encodePacked('action'))
      ) {
        action = params.uints[i].value;
      }
    }

    RockPaperScissorEntity(game.getEntity('actions')).setPlayerAction(
      player,
      action
    );
    QueueSessionEntity queue = QueueSessionEntity(game.getEntity('players'));

    if (queue.getQueueSize() == 0) {
      RockPaperScissorEntity(game.getEntity('actions')).setPlayerAction(
        player,
        action
      );
      queue.enqueue(player);
    } else {
      address player2 = QueueSessionEntity(game.getEntity('nextPlayer'))
        .nextPlayer();

      uint256 player2Action = RockPaperScissorEntity(game.getEntity('actions'))
        .getPlayerAction(player2);

      address winner = play(Hand(player, action), Hand(player2, player2Action));
      if (winner == address(0)) {
        console.log('It is a tie');
      } else {
        console.log('The winner is: ', winner);
      }

      RockPaperScissorEntity(game.getEntity('actions')).setPlayerAction(
        player,
        0
      );
      RockPaperScissorEntity(game.getEntity('actions')).setPlayerAction(
        player2,
        0
      );
    }
  }
  struct Hand {
    address player;
    uint256 actionIndex;
  }

  function play(
    Hand memory player1,
    Hand memory player2
  ) public view returns (address winner) {
    //TODO require both players to have a nonzero index
    uint256 player1Action = player1.actionIndex; //playerAction[player1];
    uint256 player2Action = player2.actionIndex; //playerAction[player2];

    if (player1Action == player2Action) {
      console.log('It is a tie');
      winner = address(0);
    } else if (
      (player1Action == 1 && player2Action == 3) ||
      (player1Action == 2 && player2Action == 1) ||
      (player1Action == 3 && player2Action == 2)
    ) {
      winner = player1.player;
      console.log('Player 1 wins');
    } else {
      winner = player2.player;
      console.log('Player 2 wins');
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

    // RockPaperScissorEntity(game.getEntity('players')).enqueue(player);
  }
}
