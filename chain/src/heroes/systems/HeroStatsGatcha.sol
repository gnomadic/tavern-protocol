// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from './interfaces/ISystem.sol';
import {IHeroStats} from './interfaces/IHeroStats.sol';
import {IPrefabLoader} from './interfaces/IPrefabLoader.sol';
import {LibPRNG} from '../../../lib/solady/src/utils/LibPRNG.sol';

import {console} from 'forge-std/console.sol';

contract HeroStatsGatcha is ISystem, IPrefabLoader {
      using LibPRNG for *;

  //1 legendary, 4 epic, 8 rare, 12 uncommon, 75 common
  uint8[] private rarityOdds;// = [1, 5, 13, 25, 75];
  uint8[] private startingStats;// = [25, 20, 15, 10, 5];

  IHeroStats public heroStats;

  string[] private baseStats;

  constructor(address reg, address _heroStats) ISystem(reg) {
    heroStats = IHeroStats(_heroStats);
  }

  function setBaseStats(string[] memory _baseStats) public onlyAdmin {
    baseStats = _baseStats;
  }

  function getBaseStats() public view returns (string[] memory) {
    return baseStats;
  }

  function setRarityOdds(uint8[] memory _rarityOdds) public onlyAdmin {
    rarityOdds = _rarityOdds;
  }

  function getRarityOdds() public view returns (uint8[] memory) {
    return rarityOdds;
  }

  function setStartingStats(uint8[] memory _startingStats) public onlyAdmin {
    startingStats = _startingStats;
  }

  function getStartingStats() public view returns (uint8[] memory) {
    return startingStats;
  }

  function getRarity(uint256 tokenId) internal view returns (uint256) {
    uint8 rarity;
    
    LibPRNG.PRNG memory prng;
    prng.seed(tokenId );

    uint256 randomNumber = prng.next() % 100;

    uint8 rateCount = 0;

    for (uint8 index = 0; index < rarityOdds.length; index++) {
      if (randomNumber <= rateCount + (rarityOdds[index])) {
        rarity = index;
        break;
      } else {
        rateCount = rateCount + rarityOdds[index];
      }
    }

    return rarity;

    // _rarity[tokenId] = rarity;
    // _statsArray[tokenId] = getStartingStats(tokenId, rarity);
  }

    function getStartingStats(uint256 tokenId, uint256 rarity) internal view returns (uint8[20] memory) {
        uint256 randomNumber;
        uint8 points = startingStats[rarity];
        uint8[20] memory stats; // TODO magic number here
        LibPRNG.PRNG memory prng;
        prng.seed(tokenId + block.timestamp + block.prevrandao);
        while (points > 0 && baseStats.length != 0) {
            randomNumber = prng.next() % baseStats.length;
            if (stats[randomNumber] < 7) { // TODO magic number here
                stats[randomNumber] = stats[randomNumber] + 1;
                points = points - 1;
            }
        }
        return stats;
    }

  function loadFromPrefab(
    uint256 tokenId,
    uint256 prefabId
  ) external onlySystem {

    console.log("HeroStatsGatcha.loadFromPrefab");
    // roll for rarity
    uint256 rarity = getRarity(tokenId);
    console.log("Rarity is %s", rarity);
    // add it to stats
    heroStats.setNumStat(tokenId, "rarity", rarity);
    uint8[20] memory points = getStartingStats(tokenId, rarity);
    console.log("got %s base stats", points.length);

    for(uint8 i = 0; i < baseStats.length; i++) {
      heroStats.addNumStat(tokenId, baseStats[i], points[i]);
    }
  }
}
