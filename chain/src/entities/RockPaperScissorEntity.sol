// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract RockPaperScissorEntity is IEntity {
  string[] public keys;

  string[4] public actions;
  mapping(address => uint256) private playerAction; // this maps to the index of the actions array

  function initialize(address _game) external override {
    game = _game;
    keys.push('actions');

    actions[0] = 'none';
    actions[1] = 'rock';
    actions[2] = 'paper';
    actions[3] = 'scissors';
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
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




}
