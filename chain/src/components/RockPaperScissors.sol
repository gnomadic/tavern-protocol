// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {RockPaperScissorEntity} from '../entities/RockPaperScissorEntity.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

contract RockPaperScissors is IComponent {
  constructor(string memory _metadata) IComponent(_metadata) {}

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
      game.getEntity('rockpaperscissors')
    );

    address player = gameEntity.getPlayerAddress(executor, 'player');
    uint256 action = gameEntity.getPlayerUint(executor, 'action');
    address player2 = gameEntity.getPlayerAddress(executor, 'player2');
    uint256 player2Action = rpsEntity.getPlayerAction(player2);
    uint256 winAmount = rpsEntity.getWinAmount();
    uint256 tieAmount = rpsEntity.getTieAmount();

    if (player == address(0) || action == 0) {
      return;
    }
    rpsEntity.setPlayerAction(player, action);

    if (player2 == address(0) || player2Action == 0) {
      return;
    }

    if (player == player2) {
      gameEntity.setFailure(
        'Cannot play against yourself!  Wait for another player.'
      );
    }

    address winner = play(Hand(player, action), Hand(player2, player2Action));
    if (winner == address(0)) {
      // console.log('It is a tie');
      gameEntity.addPlayerAddress(executor, 'tie1', player);
      gameEntity.addPlayerAddress(executor, 'tie2', player2);
      gameEntity.addPlayerUint(executor, 'amount', tieAmount);
    } else {
      // console.log('The winner is: ', winner);
      gameEntity.addPlayerAddress(executor, 'winner', winner);
      gameEntity.addPlayerUint(executor, 'amount', winAmount);
    }

    emit GameResult(Hand(player, action), Hand(player2, player2Action), winner);

    rpsEntity.setPlayerAction(player, 0);
    rpsEntity.setPlayerAction(player2, 0);
    gameEntity.addPlayerUint(executor, 'action2', player2Action);
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
    uint256 player1Action = player1.actionIndex;
    uint256 player2Action = player2.actionIndex;
    address winner = address(0);

    if (player1Action == player2Action) {
      // console.log('It is a tie');
    } else if (
      (player1Action == 1 && player2Action == 3) ||
      (player1Action == 2 && player2Action == 1) ||
      (player1Action == 3 && player2Action == 2)
    ) {
      winner = player1.player;
      // console.log('Player 1 wins');
    } else {
      winner = player2.player;
      // console.log('Player 2 wins');
    }
    return winner;
  }

  function setWinAmount(
    address gameAddress,
    uint256 amount
  ) public onlyGame(gameAddress) {
    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      IGame(gameAddress).getEntity('rockpaperscissors')
    );
    rpsEntity.setWinAmount(amount);
  }

  function setTieAmount(
    address gameAddress,
    uint256 amount
  ) public onlyGame(gameAddress) {
    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      IGame(gameAddress).getEntity('rockpaperscissors')
    );
    rpsEntity.setTieAmount(amount);
  }
}
