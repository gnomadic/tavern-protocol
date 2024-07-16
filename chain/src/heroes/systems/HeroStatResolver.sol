// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from './interfaces/ISystem.sol';
import {IHeroStats} from './interfaces/IHeroStats.sol';
import {IPrefabLoader} from './interfaces/IPrefabLoader.sol';
import {LibPRNG} from '../../../lib/solady/src/utils/LibPRNG.sol';

import {console} from 'forge-std/console.sol';

struct Resolver {
  string baseStat;
  string newStat;
  uint256 addition;
  uint256 multiplier;
}

contract HeroStatResolver is ISystem, IPrefabLoader {
  Resolver[] private resolvers;

  IHeroStats public heroStats;

  constructor(address reg, address _heroStats) ISystem(reg) {
    heroStats = IHeroStats(_heroStats);
  }

  function addResolver(
    string memory baseStat,
    string memory newStat,
    uint256 addition,
    uint256 multiplier
  ) public onlyAdmin {
    resolvers.push(Resolver(baseStat, newStat, addition, multiplier));
  }

  function loadFromPrefab(
    uint256 tokenId,
    uint256 prefabId
  ) external onlySystem {
    for (uint256 i = 0; i < resolvers.length; i++) {
      Resolver memory resolver = resolvers[i];
      uint256 baseStat = heroStats.getNumStat(tokenId, resolver.baseStat);
      if (resolver.addition != 0) {
        heroStats.setNumStat(
          tokenId,
          resolver.newStat,
          baseStat + resolver.addition
        );
      }
      if (resolver.multiplier != 0) {
        uint256 toAdd = (baseStat * resolver.multiplier) / 100;

        heroStats.addNumStat(
          tokenId,
          resolver.newStat,
          toAdd
        );
      }
    }
  }
}
