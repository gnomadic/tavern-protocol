// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract MMONeighborInteractionEntity is IEntity {
  address public game;
  string[] public keys;

  // track who has a ball
  mapping(address => uint256) public canInteract;
  mapping(address => uint256) public pendingInteractions;
  mapping(address => uint256) public canIntercept;
  // track the number of balls
  uint256 public availableInteraction;
  // if I have a ball, I can throw it and it will be in the air an hour for each index the ball is travelling
  // so player 1 can interact, so they throw it a distance.
  // then the interaction itself is in the air for 4 hours
  // and a player 4 or less away can catch it

  struct Interaction {
    address giver;
    address[] receivers;
    uint256 distance;
    uint256 time;
  }

  mapping(uint256 => Interaction) public interactions;

  function initialize(address _game) external override {
    game = _game;
    keys.push('canInteract');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

  function addNewInteractor(address player) external {
    availableInteraction++;
    canInteract[player] = availableInteraction;
    console.log(
      'adding new, can interact',
      canInteract[player],
      'user ',
      player
    );
    interactions[availableInteraction] = Interaction({
      giver: player,
      receivers: new address[](0),
      distance: 0,
      time: block.timestamp
    });
  }

  function createInteraction(
    address giver,
    address[] memory receivers,
    uint256 distance
  ) external {
    console.log('can interact', canInteract[giver]);

    interactions[canInteract[giver]].time = block.timestamp;
    interactions[canInteract[giver]].distance = distance;
    interactions[canInteract[giver]].time = distance * 1 hours;
    interactions[canInteract[giver]].receivers = receivers;

    for (uint256 i = 0; i < receivers.length; i++) {
      canIntercept[receivers[i]] = canInteract[giver];
      console.log('can Intercept', canIntercept[receivers[i]]);
    }

    pendingInteractions[giver] = canInteract[giver];
    canInteract[giver] = 0;
  }

  function interceptInteraction(address player) external {
    uint256 intercepted = canIntercept[player];

    address[] memory receivers = interactions[canIntercept[player]].receivers;
    for (uint256 i = 0; i < receivers.length; i++) {
      canIntercept[receivers[i]] = 0;
    }

    pendingInteractions[interactions[intercepted].giver] = 0;

    interactions[intercepted].time = block.timestamp;
    interactions[intercepted].distance = 0;
    interactions[intercepted].receivers = new address[](0);
    interactions[intercepted].giver = player;

    canInteract[player] = intercepted;
  }

  function canPlayerInteract(address player) external view returns (bool) {
    return canInteract[player] != 0;
  }

  function canPlayerIntercept(address player) external view returns (bool) {
    return canIntercept[player] != 0;
  }


}
