// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {Reward1155Entity} from '../entities/Reward1155Entity.sol';
import {GameEntity} from '../entities/GameEntity.sol';


contract Reward1155 is IComponent {
  string[] public required = ['players'];
  string[] public functions = ['reward'];
    string[] public abis = ['dailyInteraction(address,address)'];

  function initialize(address game) external {
    IGame(game).createEntity('Reward1155Entity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return ComponentSummary(address(this), functions,abis, required, 'Reward 1155');
  }

  // function executeFunction(
  //   address executor,
  //   address game,
  //   string calldata func,
  //   GameFuncParams calldata params
  // ) external {
  //   if (
  //     keccak256(abi.encodePacked(func)) == keccak256(abi.encodePacked('reward'))
  //   ) {
  //     // reward(IGame(game), params);
  //                 (bool success, ) = address(this).call(
  //       abi.encodeWithSignature(
  //         'reward(address,address)',
  //         executor,
  //         game
  //       )
  //     );
  //   }
  // }

  function setReward(IGame game, address _reward) external {
    Reward1155Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }

  function reward(address executor, address gameAddress) internal {
    IGame game = IGame(gameAddress);
    address player;
    uint256 token;
    uint256 amount;



    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
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
