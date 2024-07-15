// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';
import {NFTStatsEntity} from '../entities/NFTStatsEntity.sol';
import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
// import {console} from 'forge-std/console.sol';

contract NFTStats is IComponent, Initializable {
  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
    IGame(game).createEntity('NFTStatsEntity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  //requires tokenID
  function loadStats(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    NFTStatsEntity entity = NFTStatsEntity(game.getEntity('nftStats'));
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 tokenId = gameEntity.getPlayerUint(executor, 'tokenID');

    string[] memory statKeys = entity.getStatKeys();

    for (uint256 i = 0; i < statKeys.length; i++) {
      gameEntity.addPlayerUint(
        executor,
        statKeys[i],
        entity.getStat(tokenId, statKeys[i])
      );
    }
  }

  //intended to be called at the end of a flow - 
  // newStats is an array containing stats to update
  // every stat in newstat will be reset to it's current value in the flowentity.

  function setStats(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    NFTStatsEntity entity = NFTStatsEntity(game.getEntity('nftStats'));
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 tokenId = gameEntity.getPlayerUint(executor, 'tokenID');

    string[] memory toSet = gameEntity.getPlayerStringArray(
      executor,
      'newStats'
    );

    for (uint256 i = 0; i < toSet.length; i++) {
      string memory key = toSet[i];
      uint256 value = gameEntity.getPlayerUint(executor, key);
      entity.setStat(tokenId, key, value);
    }
  }
}
