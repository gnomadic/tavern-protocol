// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {Reward1155Entity} from '../entities/Reward1155Entity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';


contract Reward1155 is IComponent {

  constructor(string memory _metadata) IComponent(_metadata) {}

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function initialize(address game) external override {
    IGame(game).createEntity('Reward1155Entity');
  }

  function setReward(IGame game, address _reward, uint256 tokenId) external {
    Reward1155Entity(game.getEntity('reward1155')).setReward(_reward, tokenId);
  }

  function getReward(address game) external view returns (address) {
    return Reward1155Entity(IGame(game).getEntity('reward1155')).nft();
  }

  function getRewardTokenID(address game) external view returns (uint256) {
    return Reward1155Entity(IGame(game).getEntity('reward1155')).tokenId();
  }

  function rewardWinner(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');
    uint256 tokenID = gameEntity.getPlayerUint(executor, 'tokenId');

    address player = gameEntity.getPlayerAddress(executor, 'winner');
    if (player != address(0)) {
      if (!Reward1155Entity(game.getEntity('rewardAddress')).isTokenIDSet()) {
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          player,
          tokenID,
          amount
        );
      } else {
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          player,
          amount
        );
      }
    }
  }

  function rewardTie(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');
    uint256 tokenID = gameEntity.getPlayerUint(executor, 'tokenId');

    address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
    address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
    if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
      if (!Reward1155Entity(game.getEntity('rewardAddress')).isTokenIDSet()) {
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          tiePlayer1,
          tokenID,
          amount
        );
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          tiePlayer2,
          tokenID,
          amount
        );
      } else {
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          tiePlayer1,
          amount
        );
        Reward1155Entity(game.getEntity('rewardAddress')).sendReward(
          tiePlayer2,
          amount
        );
      }
    }
  }
}
