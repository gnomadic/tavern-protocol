// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {IGame} from '../interfaces/IGame.sol';

contract OneDayDegen is IModule, Initializable {
  string public displayName = 'One Day Degen';
  string[] public required = ['dailyAction', 'lastActionAt'];
  string[] public functions = ['dailyInteraction'];

  enum Role {
    Unknown,
    Villager,
    Werewolf,
    Doppelganger,
    Seer,
    Troublemaker
  }
  // Players and their roles (secretly stored)
  // mapping(address => Role) public roles;
  // address[] public players;

  // Moderator address
  // address public moderator;

  // Flag to indicate if the game has started
  // bool public gameStarted;

  // Phase of the game
  // uint public phase;

  struct Session {
    address[] players;
    uint8 phase;
    mapping(address => Role) roles;
  }
  mapping(address => Session) sessions;

  function initialize(address game) external override {
    
  }
  //create a new session associated with creators address
  // take in party size
  // set the phase to 1
  function createSession(address creator, uint8 partySize) external {
    require(partySize >= 4, 'Party size must be at least 4');
    require(partySize < 14, 'Party size must be less than 14');

    // clear out any session they already have
    sessions[creator].players = new address[](partySize);
    sessions[creator].phase = 0;

    // Add the creator to the players array
    sessions[creator].players.push(creator);
    sessions[creator].phase = 1;
  }

  //join based on creators address
  function joinSession(address creator) external {
    require(
      sessions[creator].players.length < 14,
      'Party size must be less than 14'
    );

    // Add the player to the players array
    sessions[creator].players.push(msg.sender);
  }

  // creator can call this, effectively start game once the session is ready
  //these are secret
  function assignRole(address creator) public {
    //assign roles to players
    //randomize roles
    //set phase to 2
    for (uint i = 0; i < sessions[creator].players.length; i++) {
      // TODO make roles a number and grab a random one
      sessions[creator].roles[sessions[creator].players[i]] = Role.Villager;
      //assign roles
      //randomize roles
      //set phase to 2
      // sessions(msg.sender).roles[sessions(msg.sender).players[i]] = Role.Villager;
    }
    // sessions(msg.sender).roles

    sessions[creator].phase = 2;
  }

  function getRole(address creator) external view returns (Role) {
    // return the msg senders role to them
    return sessions[creator].roles[msg.sender];
  }

  function getPhase(address creator) external view returns (uint8){
    return sessions[creator].phase;

  }

  function performAction() external {
    // if the current phase is the action phase, and the msg sender has the role, they can do their action
    // once they do, bump the phase
    
    require (uint(sessions[msg.sender].roles[msg.sender]) == (sessions[msg.sender].phase), 'You are not the troublemaker');
    //do action
    //increment phase
  }

  function Doppelganger(address creator, address target) external {
    // if the current phase is the deppelganger, and the msg sender has the role, they can do their action
    // once they do, bump the phase
    //crap users will have to spam refresh but can show their phase and the current phase
    require (sessions[creator].roles[msg.sender] == Role.Doppelganger, 'You are not the doppelganger');
    if (sessions[creator].phase == 2) {
      // do the doppelganger action
      sessions[creator].roles[msg.sender] = sessions[creator].roles[target];
   
      sessions[creator].phase = 4;
    }
  }

  function Werewolves() external {
    // continue
  }

  function vote() external {
    //every user votes for an address or id or something
    // when the last vote is in conclude votes
  }

  function concludeVotes() external {
    // count votes and determine winner
  }

  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }
}
