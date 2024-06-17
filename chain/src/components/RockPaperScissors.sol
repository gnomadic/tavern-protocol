// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {RockPaperScissorEntity} from '../entities/RockPaperScissorEntity.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

import {console} from 'forge-std/console.sol';

contract RockPaperScissors is IComponent {
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }
  function initialize(address game) external override {
    IGame(game).createEntity('RockPaperScissorEntity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function oneOnOne(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      game.getEntity('actions')
    );

    address player = gameEntity.getPlayerAddress(executor, 'player');
    uint256 action = gameEntity.getPlayerUint(executor, 'action');
    address player2 = gameEntity.getPlayerAddress(executor, 'player2');
    uint256 player2Action = rpsEntity.getPlayerAction(player2);

    console.log('Player 1: ', player);
    console.log('Player 1 action: ', action);
    console.log('Player 2: ', player2);
    console.log('Player 2 action: ', player2Action);

    console.log('setting player action');
    rpsEntity.setPlayerAction(player, action);

    console.log('checking player2');
    if (player2 == address(0) || player2Action == 0) {
      console.log('Player 2 not found');
      return;
    }

    if (player == player2) {
      console.log('Player 1 and Player 2 are the same');
      return;
    }

    console.log('finding winner');

    address winner = play(Hand(player, action), Hand(player2, player2Action));
    if (winner == address(0)) {
      console.log('It is a tie');
      gameEntity.addPlayerAddress(executor, 'tie1', player);
      gameEntity.addPlayerAddress(executor, 'tie2', player2);
      gameEntity.addPlayerUint(executor, 'amount', 1 * 10 ** 18);
    } else {
      console.log('The winner is: ', winner);
      gameEntity.addPlayerAddress(executor, 'winner', winner);
      gameEntity.addPlayerUint(executor, 'amount', 3 * 10 ** 18);
    }

    emit GameResult(Hand(player, action), Hand(player2, player2Action), winner);

    rpsEntity.setPlayerAction(player, 0);
    rpsEntity.setPlayerAction(player2, 0);
    gameEntity.addPlayerUint(executor, "action2", player2Action);
  }

  event GameResult(Hand player1, Hand player2, address winner);

  struct Hand {
    address player;
    uint256 actionIndex;
  }
  error NoActionYet();

  function play(
    Hand memory player1,
    Hand memory player2
  ) internal view returns (address) {
    //TODO require both players to have a nonzero index
    uint256 player1Action = player1.actionIndex;
    uint256 player2Action = player2.actionIndex;
    address winner = address(0);

    if (player1Action == player2Action) {
      console.log('It is a tie');
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
    return winner;
  }
}
