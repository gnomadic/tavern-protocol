// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {PVPResultEntity} from '../entities/PVPResultEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {FlowParams, UintKey} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
// import {console} from 'forge-std/console.sol';

contract PVPResult is IComponent {


  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
    IGame(game).createEntity('PVPResultEntity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function storeResult(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
    // console.log('storeResult');
    IGame game = IGame(gameAddress);
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    PVPResultEntity resultEntity = PVPResultEntity(game.getEntity('lastGames'));

    // console.log('resultEntity: %s', address(resultEntity));

    address player = gameEntity.getPlayerAddress(executor, 'player');
    address opponent = gameEntity.getPlayerAddress(executor, 'player2');
    address winner = gameEntity.getPlayerAddress(executor, 'winner');
    uint256 myAction = gameEntity.getPlayerUint(executor, 'action');
    uint256 opponentAction = gameEntity.getPlayerUint(executor, 'action2');

    // console.log('player: %s', player);
    // console.log('opponent: %s', opponent);
    // console.log('winner: %s', winner);
    // console.log('myAction: %s', myAction);
    // console.log('opponentAction: %s', opponentAction);

    if (player == address(0) || opponent == address(0)) {
      // console.log('player or opponent not found');
      return;
    }

    if (player == opponent) {
      // console.log('player and opponent are the same');
      return;
    }

    resultEntity.setLastGame(
      player,
      opponent,
      winner,
      myAction,
      opponentAction
    );

    resultEntity.setLastGame(
      opponent,
      player,
      winner,
      opponentAction,
      myAction
    );
  }

  function getLastGame(
    address gameAddress,
    address player
  ) public view returns (PVPResultEntity.LastGame memory) {
    IGame game = IGame(gameAddress);
    PVPResultEntity resultEntity = PVPResultEntity(game.getEntity('lastGames'));
    return resultEntity.getLastGame(player);
  }
}
