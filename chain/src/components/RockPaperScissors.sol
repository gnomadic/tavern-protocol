// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {RockPaperScissorEntity} from '../entities/RockPaperScissorEntity.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {GameEntity} from '../entities/GameEntity.sol';

import {console} from 'forge-std/console.sol';

contract RockPaperScissors is IComponent {
  string[] public required = ['nextPlayer'];
  string[] public functions = ['joinGame'];
  string[] public abis = ['oneOnOne(address,address)'];

  function initialize(address game) external {
    IGame(game).createEntity('RockPaperScissorEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(
        address(this),
        functions,
        abis,
        required,
        'Rock Paper Scissors'
      );
  }

  function oneOnOne(address executor, address gameAddress) public {
    address player;
    uint256 action;

    IGame game = IGame(gameAddress);
    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      game.getEntity('actions')
    );

    player = gameEntity.getPlayerAddress(executor, 'player');
    action = gameEntity.getPlayerUint(executor, 'action');

    rpsEntity.setPlayerAction(player, action);

    address player2 = gameEntity.getPlayerAddress(executor, 'player2');
    if (player2 == address(0)) {
      console.log('Player 2 not found');
      return;
    }
    uint256 player2Action = rpsEntity.getPlayerAction(player2);
    if (player2Action == 0) {
      console.log('Player 2 has not played yet');
      revert NoActionYet();
    }

    address winner = play(Hand(player, action), Hand(player2, player2Action));
    if (winner == address(0)) {
      console.log('It is a tie');
      gameEntity.addPlayerAddress(executor, 'tie1', player);
      gameEntity.addPlayerAddress(executor, 'tie2', player2);
    } else {
      console.log('The winner is: ', winner);
      gameEntity.addPlayerAddress(executor, 'winner', winner);
    }

    // QueueSessionEntity queue = QueueSessionEntity(game.getEntity('players'));

    // if (queue.getQueueSize() == 0) {
    //   RockPaperScissorEntity(game.getEntity('actions')).setPlayerAction(
    //     player,
    //     action
    //   );
    //   queue.enqueue(player);
    // } else {
    //   address player2 = QueueSessionEntity(game.getEntity('nextPlayer'))
    //     .nextPlayer();

    //   uint256 player2Action = RockPaperScissorEntity(game.getEntity('actions'))
    //     .getPlayerAction(player2);

    //   address winner = play(Hand(player, action), Hand(player2, player2Action));
    //   if (winner == address(0)) {
    //     console.log('It is a tie');
    //   } else {
    //     console.log('The winner is: ', winner);
    //   }

    rpsEntity.setPlayerAction(player, 0);
    rpsEntity.setPlayerAction(player2, 0);
  }
  struct Hand {
    address player;
    uint256 actionIndex;
  }
  error NoActionYet();

  function play(
    Hand memory player1,
    Hand memory player2
  ) internal view returns (address winner) {
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
}
