// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {IGame} from '../src/interfaces/IGame.sol';
import {Game} from '../src/Game.sol';
import {MMOSessionModule} from '../src/modules/MMOSessionModule.sol';
import {MMONeighborInteractionModule} from '../src/modules/MMONeighborInteractionModule.sol';
import {MMOSessionEntity} from '../src/entities/MMOSessionEntity.sol';
import {MMONeighborInteractionEntity} from '../src/entities/MMONeighborInteractionEntity.sol';
import {EntityFactory} from '../src/EntityFactory.sol';
import {ModuleRegistry} from '../src/ModuleRegistry.sol';

contract Catch is Test {
  GameFactory factory;
  IGame liveGame;

  MMOSessionModule mmoSession;
  MMONeighborInteractionModule neighborInteraction;

  function setUp() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    EntityFactory entityFactory = new EntityFactory();

    factory = new GameFactory();
    factory.initialize(address(game), address(entityFactory));

    ModuleRegistry registry = new ModuleRegistry();

    mmoSession = new MMOSessionModule();
    registry.register(address(mmoSession));
    MMOSessionEntity mmoSessionEntity = new MMOSessionEntity();
    entityFactory.registerEntity('MMOSessionEntity', address(mmoSessionEntity));

    neighborInteraction = new MMONeighborInteractionModule();
    registry.register(address(neighborInteraction));
    MMONeighborInteractionEntity neighborInteractionEntity = new MMONeighborInteractionEntity();
    entityFactory.registerEntity(
      'MMONeighborInteractionEntity',
      address(neighborInteractionEntity)
    );

    factory.createGame(address(1), 'Catch');
    liveGame = factory.games(0);

    liveGame.addModule(address(mmoSession));
    liveGame.addModule(address(neighborInteraction));

    vm.stopPrank();
  }

  function test_joinMMO() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    uint playerCount = neighborInteraction.getPlayerCount(liveGame);

    assertEq(playerCount, 4);
  }

  function test_interaction_starts() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    uint playerCount = neighborInteraction.getPlayerCount(liveGame);
    assertEq(playerCount, 4);

    uint ballCount = neighborInteraction.getInteractionCount(liveGame);
    assertEq(ballCount, 2);

    assertEq(false, neighborInteraction.canInteract(liveGame, address(1)));
    assertEq(true, neighborInteraction.canInteract(liveGame, address(2)));
    assertEq(false, neighborInteraction.canInteract(liveGame, address(3)));
    assertEq(true, neighborInteraction.canInteract(liveGame, address(4)));
  }

  function test_throw() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    neighborInteraction.createInteraction(liveGame, address(2), 4);

    assertEq(
      1,
      neighborInteraction.getPendingInteraction(liveGame, address(2))
    );
    assertEq(false, neighborInteraction.canInteract(liveGame, address(2)));
  }

  function test_intercept() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    neighborInteraction.createInteraction(liveGame, address(2), 4);

    neighborInteraction.interceptInteraction(liveGame, address(3));

    assertEq(true, neighborInteraction.canInteract(liveGame, address(3)));
    assertEq(false, neighborInteraction.canInteract(liveGame, address(2)));
        assertEq(
      0,
      neighborInteraction.getPendingInteraction(liveGame, address(2))
    );
  }
}
