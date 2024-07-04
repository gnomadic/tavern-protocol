// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './interfaces/IEntity.sol';

contract NFTStatsEntity is IEntity {

  mapping(uint256 => mapping(string => uint256)) public stats;
  string[] public statKeys;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('nftStats');
  }

  function setStat(uint256 tokenId, string memory key, uint256 value) external onlyModule {
    stats[tokenId][key] = value;

    bool statExists = false;
    for (uint256 i = 0; i < statKeys.length; i++) {
      if (keccak256(abi.encodePacked(statKeys[i])) == keccak256(abi.encodePacked(key))) {
        statExists = true;
        break;
      }
    }
    if (!statExists) {
      statKeys.push(key);
    }
  }

  function getStat(uint256 tokenId, string memory key) external view returns (uint256) {
    return stats[tokenId][key];
  }

  function getStatKeys() external view returns (string[] memory) {
    return statKeys;
  }

}
