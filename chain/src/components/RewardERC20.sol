// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

import {Reward20Entity} from '../entities/Reward20Entity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

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
        'Reward ERC20',
        'Allow players to receive rewards in the form of ERC20 tokens'
      );
  }

  function setReward(IGame game, address _reward) external {
    Reward20Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }


  // TODO rename to indicate it is sending ^ 18 rewards
  function reward(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address player = gameEntity.getPlayerAddress(executor, 'winner');
    if (player != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        player,
        amount * 10**18
      );
      return;
    }

    address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
    address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
    if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        tiePlayer1,
        amount * 10**18
      );
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        tiePlayer2,
        amount * 10**18
      );
    }
  }
}
