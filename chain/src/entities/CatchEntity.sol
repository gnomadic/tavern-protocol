// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract CatchEntity is IEntity {

  uint256 public ballCount;
  Position[] public ballHolderPositions;
  Position[] public ballCatcherPositions;
  mapping(address => Player) private players;
  mapping(uint256 => Ball) private balls;

  struct Player {
    uint256[] hasBalls;
    uint256[] canCatch;
    uint256 position;
    uint256 ballHolderIndex;
    uint256 ballCatcherIndex;
  }

  struct Ball {
    address thrower;
    address[] catchers;
    uint256 distance;
  }

  struct Position {
    uint256 x;
    address player;
  }

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('balls');
  }



  function addNewThrower(address player, uint256 position) public onlyModule {
    ballCount++;

    players[player].hasBalls.push(ballCount);
    players[player].position = position;

    balls[ballCount] = Ball(player, new address[](0), 0);
    ballHolderPositions.push(Position(position, player));
    players[player].ballHolderIndex = ballHolderPositions.length - 1;
  }

  function addNewPlayer(address player, uint256 position) public onlyModule {
    players[player].position = position;
  }

  function canIThrow(address player) public view returns (bool) {
    return players[player].hasBalls.length > 0;
  }

  function canICatch(address player) public view returns (bool) {
    return players[player].canCatch.length > 0;
  }

  function getBallHolderPositions() public view returns (Position[] memory) {
    return ballHolderPositions;
  }

  function getPlayerPosition(address player) public view returns (uint256) {
    return players[player].position;
  }

  function getBallCatcherPositions() public view returns (Position[] memory) {
    for (uint256 i = 0; i < ballCatcherPositions.length; i++) {
      console.log('ballCatcherPositions', ballCatcherPositions[i].player);
    }
    return ballCatcherPositions;
  }

  function throwBall(
    address player,
    uint256 distance,
    address[] memory catchersInRange
  ) public onlyModule {
    // update ball
    uint256 ballIndex = players[player].hasBalls[0];
    balls[ballIndex].distance = distance;

    console.log('updated ball');

    //update catchers
    for (uint256 i = 0; i < catchersInRange.length; i++) {
      players[catchersInRange[i]].canCatch.push(ballIndex);
      balls[ballIndex].catchers.push(catchersInRange[i]);
      if (players[catchersInRange[i]].canCatch.length == 1) {
        ballCatcherPositions.push(
          Position(players[catchersInRange[i]].position, catchersInRange[i])
        );
        players[catchersInRange[i]].ballCatcherIndex =
          ballCatcherPositions.length -
          1;
      }
    }

    console.log('updated catchers');

    //update player
    players[player].hasBalls[0] = players[player].hasBalls[
      players[player].hasBalls.length - 1
    ];
    players[player].hasBalls.pop();

    console.log('updated player');

    //update holder index
    if (players[player].hasBalls.length == 0) {
      ballHolderPositions[
        players[player].ballHolderIndex
      ] = ballHolderPositions[ballHolderPositions.length - 1];

      //update player with new index after this swap.
      players[ballHolderPositions[players[player].ballHolderIndex].player]
        .ballHolderIndex = players[player].ballHolderIndex;

      ballHolderPositions.pop();
    }
  }

  function catchBall(address player) public onlyModule {
    console.log('can catch count: ', players[player].canCatch.length);
    uint256 ballIndex = players[player].canCatch[0];

    // update player
    players[player].hasBalls.push(ballIndex);

    //update holder index
    if (players[player].hasBalls.length == 1) {
      ballHolderPositions.push(Position(players[player].position, player));
      players[player].ballHolderIndex = ballHolderPositions.length - 1;
    }

    // update catcher index
    for (uint256 i = 0; i < balls[ballIndex].catchers.length; i++) {
      if (players[balls[ballIndex].catchers[i]].canCatch.length == 1) {
        //remove from index
        ballCatcherPositions[
          players[balls[ballIndex].catchers[i]].ballCatcherIndex
        ] = ballCatcherPositions[ballCatcherPositions.length - 1];
        players[
          ballCatcherPositions[
            players[balls[ballIndex].catchers[i]].ballCatcherIndex
          ].player
        ].ballCatcherIndex = players[balls[ballIndex].catchers[i]]
          .ballCatcherIndex;
        ballCatcherPositions.pop();
      }
      //remove this ball from their catch array
      for (
        uint256 j = 0;
        j < players[balls[ballIndex].catchers[i]].canCatch.length;
        j++
      ) {
        if (players[balls[ballIndex].catchers[i]].canCatch[j] == ballIndex) {
          players[balls[ballIndex].catchers[i]].canCatch[j] = players[
            balls[ballIndex].catchers[i]
          ].canCatch[players[balls[ballIndex].catchers[i]].canCatch.length - 1];
          players[balls[ballIndex].catchers[i]].canCatch.pop();
        }
      }
    }

    //update ball
    balls[ballIndex].catchers = new address[](0);
    balls[ballIndex].distance = 0;
    balls[ballIndex].thrower = player;
  }
}
