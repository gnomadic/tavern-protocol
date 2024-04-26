// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {Reward1155Entity} from '../entities/Reward1155Entity.sol';

contract Reward1155 is IComponent {
  string[] public required = ['players'];
  string[] public functions = ['reward'];

  function initialize(address game) external {
    IGame(game).createEntity('Reward1155Entity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return ComponentSummary(address(this), functions, required, 'Reward 1155');
  }

  function executeFunction(
    address game,
    string calldata func,
    GameFuncParams calldata params
  ) external {
    if (
      keccak256(abi.encodePacked(func)) == keccak256(abi.encodePacked('reward'))
    ) {
      reward(IGame(game), params);
    }
  }

  function setReward(IGame game, address _reward) external {
    Reward1155Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }

  function reward(IGame game, GameFuncParams calldata params) internal {
    address player;
    uint256 token;
    uint256 amount;
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
        keccak256(abi.encodePacked('token'))
      ) {
        token = params.uints[i].value;
      }
      if (
        keccak256(abi.encodePacked(params.uints[i].name)) ==
        keccak256(abi.encodePacked('amount'))
      ) {
        amount = params.uints[i].value;
      }
    }

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
