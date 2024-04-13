// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from './interfaces/IEntity.sol';

contract OneDayDegenEntity is IEntity {
  enum Role {
    Villager,
    Werewolf,
    Seer,
    Troublemaker
  }
  // Players and their roles (secretly stored)
  mapping(address => Role) public roles;
  address[] public players;

  // Moderator address
  address public moderator;

  // Flag to indicate if the game has started
  bool public gameStarted;

  mapping(address => address) public votes;

  string[] public keys = [
    'roles',
    'players',
    'moderator',
    'gameStarted',
    'votes'
  ];

  function initialize(address _game) public override {}

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }
}
