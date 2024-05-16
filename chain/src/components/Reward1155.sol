// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {Reward1155Entity} from '../entities/Reward1155Entity.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

contract Reward1155 is IComponent {
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }
  function getSummary() external view returns (ComponentSummary memory) {
    return ComponentSummary(address(this), metadata);
  }

  function initialize(address game) external {
    IGame(game).createEntity('Reward1155Entity');
  }

  function setReward(IGame game, address _reward) external {
    Reward1155Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }

  function reward(address executor, address gameAddress) internal {
    IGame game = IGame(gameAddress);
    address player;
    uint256 token;
    uint256 amount;

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');
    token = gameEntity.getPlayerUint(executor, 'token');
    amount = gameEntity.getPlayerUint(executor, 'amount');

    Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
      player,
      token,
      amount
    );
  }

  function sendReward(address player, uint256 token, uint256 amount) external {
    Reward1155Entity(msg.sender).sendReward(player, token, amount);
  }
}
