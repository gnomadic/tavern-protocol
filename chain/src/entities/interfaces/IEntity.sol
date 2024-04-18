// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IGame} from '../../interfaces/IGame.sol';

abstract contract IEntity {

  address public game;

  function getAvailableKeys() external view virtual returns (string[] memory);
  function initialize(address _game) external virtual;
  // TODO there are Game Scope and Player Scoped variables 

  modifier onlyModule(){
    if (IGame(game).getSupportedFunctions(msg.sender).length == 0) {
      revert('Module not supported');
    }
    _;
  }
}
