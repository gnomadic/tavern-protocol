// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {Reward20Entity} from '../entities/Reward20Entity.sol';
import {GameEntity} from '../entities/GameEntity.sol';

contract RewardERC20 is IComponent {
  string[] public required = ['winner', 'amount', 'tiePlayer1', 'tiePlayer2'];
  string[] public functions = ['reward'];
  string[] public abis = ['reward(address,address)'];

  function initialize(address game) external {
    IGame(game).createEntity('Reward20Entity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(
        address(this),
        functions,
        abis,
        required,
        'Reward ERC20'
      );
  }

  function setReward(IGame game, address _reward) external {
    Reward20Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }

  function reward(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);

    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address player = gameEntity.getPlayerAddress(executor, 'winner');
    if (player != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        player,
        amount
      );
      return;
    }

    address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
    address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');

    Reward20Entity(game.getEntity('rewardAddress')).sendReward(
      tiePlayer1,
      amount
    );
    Reward20Entity(game.getEntity('rewardAddress')).sendReward(
      tiePlayer2,
      amount
    );
  }
}
