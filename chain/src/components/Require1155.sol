// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

import {Require1155Entity} from '../entities/Require1155Entity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import {console} from 'forge-std/console.sol';

contract Require1155 is IComponent {
  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
    IGame(game).createEntity('Require1155Entity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function setRequiredToken(
    address game,
    address _reward
  ) external onlyGM(game) {
    Require1155Entity(IGame(game).getEntity('require1155')).setRequiredToken(
      _reward
    );
  }

  function setRequiredToken(
    address game,
    address _reward,
    uint256 _tokenId
  ) external onlyGM(game) {
    Require1155Entity(IGame(game).getEntity('require1155')).setRequiredToken(
      _reward,
      _tokenId
    );
  }

  function setRequiredBalance(
    address game,
    uint256 balance
  ) external onlyGM(game) {
    Require1155Entity(IGame(game).getEntity('require1155')).setRequiredBalance(
      balance
    );
  }

  function getRequiredToken(address game) external view returns (address) {
    return Require1155Entity(IGame(game).getEntity('require1155')).nft();
  }

  function getRequiredBalance(address game) external view returns (uint256) {
    return
      Require1155Entity(IGame(game).getEntity('require1155')).requiredBalance();
  }

  function requireBalance(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));

    address player = gameEntity.getPlayerAddress(executor, 'player');

    bool hasBalance = Require1155Entity(IGame(game).getEntity('require1155'))
      .hasBalance(player);

    if (!hasBalance) {
      console.log('Player does not have required balance');
      gameEntity.setFailure('Player does not have required balance');
    }
  }

  // function rewardWinner(
  //   address executor,
  //   address gameAddress
  // ) public onlyGame(gameAddress) {
  //   console.log('reward winner');

  //   IGame game = IGame(gameAddress);

  //   FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
  //   uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

  //   address player = gameEntity.getPlayerAddress(executor, 'winner');
  //   if (player != address(0)) {
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       player,
  //       amount
  //     );
  //   }
  // }

  // function rewardTie(
  //   address executor,
  //   address gameAddress
  // ) public onlyGame(gameAddress) {
  //   console.log('reward tie');
  //   IGame game = IGame(gameAddress);

  //   FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
  //   uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

  //   address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
  //   address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
  //   if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       tiePlayer1,
  //       amount
  //     );
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       tiePlayer2,
  //       amount
  //     );
  //   }
  // }
}
