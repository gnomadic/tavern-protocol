// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {PrefabNFTStatsEntity} from '../entities/PrefabNFTStatsEntity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

contract PrefabNFTStats is IComponent {
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
    IGame(game).createEntity('PrefabNFTStatsEntity');
  }

  function createPrefab(
    address game,
    string memory prefabName,
    address tokenAddress,
    uint256 _tokenId,
    string[] memory _stats,
    uint256[] memory _values
  ) external onlyGM(game) {
    PrefabNFTStatsEntity(IGame(game).getEntity('prefabstats')).createPrefab(
      prefabName,
      tokenAddress,
      _tokenId,
      _stats,
      _values
    );
  }

  function getStat(
    address game,
    string memory name,
    uint256 _tokenId,
    string memory _stat
  ) external view returns (uint256) {
    return
      PrefabNFTStatsEntity(IGame(game).getEntity('prefabstats')).getStat(name,
        _tokenId,
        _stat
      );
  }

  function loadStats(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    IGame game = IGame(gameAddress);
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));


    PrefabNFTStatsEntity entity = PrefabNFTStatsEntity(game.getEntity('prefabstats'));
    uint256 tokenID = gameEntity.getPlayerUint(executor, 'tokenId');
    string memory tokenName = gameEntity.getPlayerString(executor, 'tokenName');
    
    string[] memory statKeys = entity.getStatKeys(tokenName);
    for (uint256 i = 0; i < statKeys.length; i++) {
      gameEntity.addPlayerUint(
        executor,
        statKeys[i],
        entity.getStat(tokenName, tokenID, statKeys[i])
      );
    }

    gameEntity.addPlayerStringArray(executor, "newStats", statKeys);

  }
}
