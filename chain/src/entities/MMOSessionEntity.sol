// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract MMOSessionEntity is IEntity {
  address[] public players;
  mapping(address => uint256) playerIndex;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('players');
    keys.push('playerIndex');
  }

  function addPlayer(address player) external onlyModule returns (uint256) {
    if (playerIndex[player] != 0) {
      return playerIndex[player];
    }
    players.push(player);
    playerIndex[player] = players.length - 1;
    return playerIndex[player];
  }

  function getPlayersInRange(
    address from,
    uint256 count
  ) external view returns (address[] memory) {
    uint256 startAt;
    uint256 endAt;
    if (playerIndex[from] < count) {
      startAt = 0;
    } else {
      startAt = playerIndex[from] - count;
    }
    if (playerIndex[from] + count > players.length) {
      endAt = players.length;
    } else {
      endAt = playerIndex[from] + count;
    }

    address[] memory result = new address[](endAt - startAt);

    console.log('start at', startAt);
    console.log('end at', endAt);

    uint256 cur = 0;
    for (uint256 i = startAt; i < endAt; i++) {
      result[cur] = players[i];

      cur++;
    }
    return result;
  }

  function getPlayerCount() external view returns (uint256) {
    return players.length;
  }

  function getPlayerIndex(address player) external view returns (uint256) {
    return playerIndex[player];
  }

  error PlayerAlreadyInSession();
  error PlayerNotInSession();
}
