// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './interfaces/IEntity.sol';

contract DailyInteractionEntity is IEntity {
  mapping(address => uint256) public lastActionAt;
  mapping(address => uint256) public dailyActions;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('lastActionAt');
    keys.push('dailyActions');
  }

  function getLastActionAt(address player) public view returns (uint256) {
    return lastActionAt[player];
  }

  function getDailyActions(address player) public view returns (uint256) {
    return dailyActions[player];
  }

  function updateLastActionAt(
    address player,
    uint256 _lastActionAt
  ) public onlyModule {
    lastActionAt[player] = _lastActionAt;
  }

  function updateDailyActions(
    address player,
    uint256 _dailyActions
  ) public onlyModule {
    dailyActions[player] = _dailyActions;
  }
}
