// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract RockPaperScissorEntity is IEntity {
  string[4] public actions;
  mapping(address => uint256) private playerAction; // this maps to the index of the actions array
  uint256 winAmount;
  uint256 tieAmount;


  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('rockpaperscissors');

    actions[0] = 'none';
    actions[1] = 'rock';
    actions[2] = 'paper';
    actions[3] = 'scissors';

    winAmount = 3 * 10 ** 18;
    tieAmount = 1 * 10 ** 18;
  }

  function getAvailableActions() external view returns (string[4] memory) {
    return actions;
  }

  function setAvailableActions(string[3] calldata _actions) external {
    //actions[0] needs to be none for the mapping default value
    actions[1] = _actions[0];
    actions[2] = _actions[1];
    actions[3] = _actions[2];
  }

  function setPlayerAction(address player, uint256 actionIndex) external {
    playerAction[player] = actionIndex;
  }

  function getPlayerAction(address player) external view returns (uint256) {
    return playerAction[player];
  }

  function getWinAmount() external view returns (uint256) {
    return winAmount;
  }

  function getTieAmount() external view returns (uint256) {
    return tieAmount;
  }

  function setWinAmount(uint256 _winAmount) external {
    winAmount = _winAmount;
  }

  function setTieAmount(uint256 _tieAmount) external {
    tieAmount = _tieAmount;
  }
}
