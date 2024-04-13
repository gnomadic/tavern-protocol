// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from './interfaces/IEntity.sol';
import {IStringEntity} from './interfaces/IStringEntity.sol';
import {INumberEntity} from './interfaces/INumberEntity.sol';

contract HostedVoteEntity is IEntity {
  //global per game

  // uint8 public roleCount;
  // mapping(uint8 => VoteData) public voteData;
  // unique per session
  mapping(address => HostedVoteData) hostedVotes;

  string[] public keys;

  function initialize(address _game) public override {
    // keys.push('voteData');
    keys.push('hostedVotes');
    // keys.push('roleCount');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

  // function getRoleNames() external view returns (VoteData[] memory) {
  //   VoteData[] memory _roleNames = new RoleData[](roleCount);
  //   for (uint8 i = 0; i < roleCount; i++) {
  //     _roleNames[i] = roleData[i];
  //   }
  //   return _roleNames;
  // }

  function vote(address host, address _voter, address _votee) external {
    hostedVotes[host].votes[_voter] = _votee;
    hostedVotes[host].players.push(_voter);
  }


  function getVote(
    address host,
    address _player
  ) external view returns (address) {
    return hostedVotes[host].votes[_player];
  }

  function getVotesFor(
    address host,
    address _player
  ) external view returns (uint8) {
    uint8 count = 0;
    for (uint8 i = 0; i < hostedVotes[host].players.length; i++) {
      if (hostedVotes[host].votes[hostedVotes[host].players[i]] == _player) {
        count++;
      }
    }
    return count;
  }

  struct HostedVoteData {
    mapping(address => address) votes;
    address[] players;
  }

}
