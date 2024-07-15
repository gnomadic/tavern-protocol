// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IEntity} from './interfaces/IEntity.sol';

contract PlayerStatsEntity is IEntity {

  mapping(address => mapping(string => uint256)) public stats;
  string[] public statKeys;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('nftStats');
  }

  function setStat(address player, string memory key, uint256 value) external onlyModule {
    stats[player][key] = value;

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

  function getStat(address player, string memory key) external view returns (uint256) {
    return stats[player][key];
  }

  function getStatKeys() external view returns (string[] memory) {
    return statKeys;
  }

}
