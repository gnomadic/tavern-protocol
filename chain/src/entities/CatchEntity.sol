// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IEntity.sol";

contract CatchEntity is IEntity {
  address public game;

  function initialize(address _game) external override {
    game = _game;
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    string[] memory keys = new string[](1);
    // keys[0] = "game";
    return keys;
  }
}