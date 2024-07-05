// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import {console} from 'forge-std/console.sol';

contract QueueSessionEntity is IEntity {
  mapping(uint256 => address) queue;
  uint256 first;
  uint256 last;
  mapping(address => bool) playerInQueue;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('nextPlayer');
    keys.push('queueSize');
    first = 1;
    last = 0;
  }

  function enqueue(address data) public {
    // console.log("enqieue last", last);
    // console.log("enqieue first", first);

    last += 1;
    queue[last] = data;
    playerInQueue[data] = true;
    //     console.log('0', queue[0]);
    // console.log('1', queue[1]);
    // console.log('2', queue[2]);
  }

  function nextPlayer() public returns (address data) {
    require(last >= first); // non-empty queue

    // console.log('last', last);
    // console.log('first', first);
    // console.log('0', queue[0]);
    // console.log('1', queue[1]);
    // console.log('2', queue[2]);
    data = queue[first];
    playerInQueue[data] = false;

    delete queue[first];
    first += 1;
  }

  function getQueueSize() public view returns (uint256) {
    if (last < first) return 0;
    // if (last == first) return 1;
    return last + 1 - first;
  }

  function isPlayerInQueue(address player) public view returns (bool) {
    return playerInQueue[player];
  }
}
