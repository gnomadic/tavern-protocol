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
import {CatchEntity} from '../src/entities/CatchEntity.sol';

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
    CatchEntity catchEntity = new CatchEntity();
    entityFactory.registerEntity('CatchEntity', address(catchEntity));

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

    uint ballCount = neighborInteraction.getBallCount(liveGame);
    assertEq(ballCount, 2);

    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(1)));
    assertEq(true, neighborInteraction.canPlayerThrow(liveGame, address(2)));
    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(3)));
    assertEq(true, neighborInteraction.canPlayerThrow(liveGame, address(4)));
  }

  function test_throw() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    neighborInteraction.throwBall(liveGame, address(2), 4);

    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(2)));

    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(1)));
    // You can catch your own ball that's probably ok.  when we add scoring that'll be a score of 0
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(2)));
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(3)));
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(4)));
  }

  function test_intercept() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    neighborInteraction.throwBall(liveGame, address(2), 4);

    neighborInteraction.catchBall(liveGame, address(3));

    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(2)));

    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(1)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(2)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(3)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(4)));

    assertEq(true, neighborInteraction.canPlayerThrow(liveGame, address(3)));
  }

  function test_multiple() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));

    neighborInteraction.throwBall(liveGame, address(2), 4);
    neighborInteraction.throwBall(liveGame, address(4), 4);
  }


  function test_multiple_indexes() public {
    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));
    // 2 people are holding balls (every other player gets one)
    assertEq(neighborInteraction.getBallHolderIndexes(liveGame).length, 2);

    // player 2 and 4 throws a ball
    neighborInteraction.throwBall(liveGame, address(2), 4);
    neighborInteraction.throwBall(liveGame, address(4), 4);

    // now nobody holds a ball
    assertEq(neighborInteraction.getBallHolderIndexes(liveGame).length, 0);
    // and all four players can catch it
    assertEq(neighborInteraction.getCatchableIndexes(liveGame).length, 4);

  }
}
