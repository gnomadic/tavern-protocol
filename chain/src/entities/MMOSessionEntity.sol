// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import "forge-std/console.sol";

contract MMOSessionEntity is IEntity {
  string[] public keys;

  address[] public players;
  mapping(address => uint256) playerIndex;

  function initialize(address _game) external override {
    game = _game;
    keys.push('players');
    keys.push('playerIndex');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

  function addPlayer(address player) external onlyModule() returns (uint256) {
    if (playerIndex[player] != 0) {
      revert PlayerAlreadyInSession();
    }
    players.push(player);
    playerIndex[player] = players.length;
    return playerIndex[player];
  }

  function removePlayer(address player) external onlyModule() {
    if (playerIndex[player] == 0) {
      revert PlayerNotInSession();
    }
    uint256 index = playerIndex[player] - 1;
    players[index] = players[players.length - 1];
    playerIndex[players[index]] = index + 1;
    players.pop();
    delete playerIndex[player];
  }

  function getPlayersInRange(
    address from,
    uint256 count
  ) external view returns (address[] memory) {
    uint256 startAt; uint256 endAt;
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
    for (uint256 i = startAt; i < endAt ; i++) {
      result[cur] = players[i];
      // console.log("player", players[i]);

      cur++;
    }
    return result;
  }

  function getPlayerCount() external view returns (uint256) {
    return players.length;
  }

  error PlayerAlreadyInSession();
  error PlayerNotInSession();
}
