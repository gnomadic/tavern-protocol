// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {IGame, GameFuncParams} from '../src/interfaces/IGame.sol';
import {Game} from '../src/Game.sol';
import {EntityFactory} from '../src/EntityFactory.sol';
import {ComponentRegistry} from '../src/ComponentRegistry.sol';

abstract contract TavernTest is Test {
  GameFactory public factory;
  Game public liveGame;
  ComponentRegistry public registry;
  EntityFactory public entityFactory;

  function deployTavern() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    entityFactory = new EntityFactory();

    factory = new GameFactory();
    factory.initialize(address(game), address(entityFactory));

    registry = new ComponentRegistry();

    // mmoSession = new MMOSessionModule();
    // registry.register(address(mmoSession));
    // MMOSessionEntity mmoSessionEntity = new MMOSessionEntity();
    // entityFactory.registerEntity('MMOSessionEntity', address(mmoSessionEntity));

    // neighborInteraction = new MMONeighborInteractionModule();
    // registry.register(address(neighborInteraction));
    // MMONeighborInteractionEntity neighborInteractionEntity = new MMONeighborInteractionEntity();
    // entityFactory.registerEntity(
    //   'MMONeighborInteractionEntity',
    //   address(neighborInteractionEntity)
    // );
    // CatchEntity catchEntity = new CatchEntity();
    // entityFactory.registerEntity('CatchEntity', address(catchEntity));

    factory.createGame(address(0), 'testGame');
    liveGame = factory.games(0);

    // liveGame.addComponent(address(mmoSession));
    // liveGame.addComponent(address(neighborInteraction));

    loadModules();

    createFunctions();

    vm.stopPrank();
  }

  function loadModules() public virtual;
  

  function createFunctions() public virtual;


  function clearParams(GameFuncParams memory toClear) public {
    delete toClear.addresses;
    delete toClear.strings;
    delete toClear.uints;
  }
}
