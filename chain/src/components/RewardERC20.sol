// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

import {Reward20Entity} from '../entities/Reward20Entity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import {console} from 'forge-std/console.sol';

contract RewardERC20 is IComponent {

  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
    IGame(game).createEntity('Reward20Entity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function setReward(address game, address _reward) external onlyGM(game){
    Reward20Entity(IGame(game).getEntity('rewardAddress')).setReward(_reward);
  }

  function getRewardToken(address game) external view returns (address) {
    return Reward20Entity(IGame(game).getEntity('rewardAddress')).token();
  }

  function rewardWinner(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    console.log('reward winner');

    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address player = gameEntity.getPlayerAddress(executor, 'winner');
    if (player != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        player,
        amount
      );
    }
  }

  function rewardTie(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    console.log('reward tie');
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
    address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
    if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
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
}
