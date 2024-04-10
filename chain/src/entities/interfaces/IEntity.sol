// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

abstract contract IEntity {
  function getAvailableKeys() external view virtual returns (string[] memory);
  function initialize(address _game) external virtual;
  // TODO there are Game Scope and Player Scoped variables 
}
