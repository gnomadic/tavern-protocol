// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IEntity} from './interfaces/IEntity.sol';

contract PVPResultEntity is IEntity {

  struct LastGame {
    address opponent;
    address winner;
    uint256 myAction;
    uint256 opponentAction;
  }

  mapping (address => LastGame) public lastGames;


  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('lastGames');
  }


  function setLastGame(address player, address opponent, address winner, uint256 myAction, uint256 opponentAction) public {
    lastGames[player] = LastGame(opponent, winner, myAction, opponentAction);
  }

  function getLastGame(address player) public view returns (LastGame memory) {
    return lastGames[player];
  }
}
