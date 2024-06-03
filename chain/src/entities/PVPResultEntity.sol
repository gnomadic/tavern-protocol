// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

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
    console.log("setting last game in entity");
    lastGames[player] = LastGame(opponent, winner, myAction, opponentAction);
    console.log("set last game in entity");
  }

  function getLastGame(address player) public view returns (LastGame memory) {
    return lastGames[player];
  }
}
