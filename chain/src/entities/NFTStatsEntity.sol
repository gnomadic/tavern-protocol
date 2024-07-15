// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IEntity} from './interfaces/IEntity.sol';

contract NFTStatsEntity is IEntity {
  mapping(uint256 => mapping(string => uint256)) public stats;
  string[] public statKeys;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('nftStats');
  }

  function setStat(
    uint256 tokenId,
    string memory key,
    uint256 value
  ) external onlyModule {
    if (stats[tokenId][key] == 0) {
      statKeys.push(key);
    }
    stats[tokenId][key] = value;
  }

  function getStat(
    uint256 tokenId,
    string memory key
  ) external view returns (uint256) {
    return stats[tokenId][key];
  }

  function getStatKeys() external view returns (string[] memory) {
    return statKeys;
  }
}
