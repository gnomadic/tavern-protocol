// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract PrefabNFTStatsEntity is IEntity {
  // tokenid => (stat => value);
  // mapping(uint256 => mapping(string => uint256)) public prefab;
  // string[] public statKeys;

  mapping(string => testing) private prefabs;

  struct testing {
    // uint256 tokenId;
    // string stat;
    // uint256 value;
    // mapping (string => uint256) stats;
    address tokenAddress;
    string[] statKeys;
    mapping(uint256 => mapping(string => uint256)) prefab;
  }

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('prefabstats');
  }

  function getStat(
    string memory name,
    uint256 _tokenId,
    string memory _stat
  ) external view returns (uint256) {
    // testing storage prefab = prefabs[name];
    // return prefab[_tokenId][_stat];
    return prefabs[name].prefab[_tokenId][_stat];
  }

  function getStatKeys(string memory name) external view returns (string[] memory) {
    return prefabs[name].statKeys;
  }

  function createPrefab(
    string memory name,
    address tokenAddress,
    uint256 tokenId,
    string[] memory _stats,
    uint256[] memory _values
  ) external onlyModule {
    for (uint256 i = 0; i < _stats.length; i++) {
      prefabs[name].tokenAddress = tokenAddress;
      prefabs[name].statKeys.push(_stats[i]);
      prefabs[name].prefab[tokenId][_stats[i]] = _values[i];
    }
  }
}

//   function setReward(address _nft, uint256 _tokenId) external onlyModule {
//     nft = _nft;
//     tokenId = _tokenId;
//     isTokenIDSet = true;
//   }

//   function setReward(address _nft) external onlyModule {
//     nft = _nft;
//   }

//   function sendReward(
//     address player,
//     uint256 token,
//     uint256 amount
//   ) external onlyModule {
//     SimpleMintable(nft).mint(player, token, amount);
//   }

//   function sendReward(address player, uint256 amount) external onlyModule {
//     SimpleMintable(nft).mint(player, tokenId, amount);
//   }
// }

// interface SimpleMintable {
//   function mint(address to, uint256 tokenId, uint256 amount) external;
// }
