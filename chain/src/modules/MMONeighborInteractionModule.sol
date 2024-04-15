// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {MMONeighborInteractionEntity} from '../entities/MMONeighborInteractionEntity.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

contract MMONeighborInteractionModule is IModule {
  function initialize(address game) external {
    address roleEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'MMONeighborInteractionEntity');

    IGame(game).addEntity(roleEntity);
  }

  function getSummary() external view returns (ModuleSummary memory) {
    return
      ModuleSummary(address(this), new string[](0), new string[](0), 'Catch');
  }

  function getPlayerCount(IGame game) public view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }

  function joinSession(IGame game, address player) public {
    MMOSessionEntity(game.getEntity('players')).addPlayer(player);
    if (getPlayerCount(game) % 2 == 0) {
      MMONeighborInteractionEntity(game.getEntity('canInteract')).addNewInteractor(
        player
      );
    }
  }

  function getInteractionCount(IGame game) public view returns (uint256) {
    return
      MMONeighborInteractionEntity(game.getEntity('canInteract'))
        .availableInteraction();
  }

  function createInteraction(
    IGame game,
    address giver,
    uint256 distance
  ) public {
    bool canPlayerInteract = MMONeighborInteractionEntity(
      game.getEntity('canInteract')
    ).canPlayerInteract(giver);
    if (!canPlayerInteract) revert CannotInteract();

    address[] memory playerInRange = MMOSessionEntity(game.getEntity('players'))
      .getPlayersInRange(giver, distance);

    MMONeighborInteractionEntity(game.getEntity('canInteract')).createInteraction(
      giver,
      playerInRange,
      distance
    );
  }

  function getPlayersInRange(IGame game, address from, uint256 count)
    public
    view
    returns (address[] memory)
  {
    return MMOSessionEntity(game.getEntity('players')).getPlayersInRange(from, count);
  }

  function canIntercept(IGame game, address player) public view returns (bool) {
    return MMONeighborInteractionEntity(game.getEntity('canInteract'))
      .canPlayerIntercept(player);
  }

  function canInteract(IGame game, address player) public view returns (bool) {
    return MMONeighborInteractionEntity(game.getEntity('canInteract'))
      .canPlayerInteract(player);
  }

  function getHeldInteraction(IGame game, address player)
    public
    view
    returns (uint256)
  {
    return MMONeighborInteractionEntity(game.getEntity('canInteract'))
      .canInteract(player);
  }

  function getPendingInteraction(IGame game, address player) public view returns (uint256) {
    return MMONeighborInteractionEntity(game.getEntity('canInteract'))
      .pendingInteractions(player);
  }

  

  function interceptInteraction(IGame game, address player) public {

    uint256 interactionId = MMONeighborInteractionEntity(
      game.getEntity('canInteract')
    ).canIntercept(player);
    if (interactionId == 0) revert CannotIntercept();

    MMONeighborInteractionEntity(game.getEntity('canInteract')).interceptInteraction(
      player
    );


  }
  error CannotInteract();
  error CannotIntercept();
}
