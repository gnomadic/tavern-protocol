// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from './interfaces/IEntity.sol';
import {IStringEntity} from './interfaces/IStringEntity.sol';
import {INumberEntity} from './interfaces/INumberEntity.sol';

contract HostedSessionEntity is IEntity {
  //global per game
  string[] public keys;
  uint8 public maxSessionSize;
  // TODO do we want to track active sessions in an array so people can join random games?

  // unique per session
  mapping(address => HostedSessionData) hostedSessions;

  function initialize(address _game) public override {
    keys.push('hostedSessions');
    keys.push('maxSessionSize');
  }

  function setMaxSessionSize(uint8 _maxSessionSize) public {
    maxSessionSize = _maxSessionSize;
  }

  function getAvailableKeys() public view override returns (string[] memory) {
    return keys;
  }

  function createSession(address host) external {
    endSession(host);
    joinSession(host, host);
  }

  function joinSession(address host, address joiner) public {
    if (hostedSessions[host].players.length >= maxSessionSize)
      revert SessionFull();
    hostedSessions[host].players.push(joiner);
  }

  function endSession(address host) public {
    delete hostedSessions[host];
  }

  error SessionFull();

  struct HostedSessionData {
    address[] players;
  }
}
