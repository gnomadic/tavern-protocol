// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {IGame} from '../src/interfaces/IGame.sol';
import {Game} from '../src/Game.sol';
import {MMOSessionModule} from '../src/components/MMOSessionModule.sol';
import {MMONeighborInteractionModule} from '../src/components/MMONeighborInteractionModule.sol';
import {MMOSessionEntity} from '../src/entities/MMOSessionEntity.sol';
import {MMONeighborInteractionEntity} from '../src/entities/MMONeighborInteractionEntity.sol';
import {EntityFactory} from '../src/EntityFactory.sol';
import {ComponentRegistry} from '../src/ComponentRegistry.sol';
import {CatchEntity} from '../src/entities/CatchEntity.sol';
import {AddressKey, GameFuncParams, GameFuncAddress, GameFuncString, GameFuncUint} from '../src/interfaces/IGame.sol';

contract Catch is Test {
  GameFactory factory;
  Game liveGame;

  MMOSessionModule mmoSession;
  MMONeighborInteractionModule neighborInteraction;

  function setUp() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    EntityFactory entityFactory = new EntityFactory();

    factory = new GameFactory();
    factory.initialize(address(game), address(entityFactory));

    ComponentRegistry registry = new ComponentRegistry();

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

    liveGame.addComponent(address(mmoSession));
    liveGame.addComponent(address(neighborInteraction));

    createFunctions();

    vm.stopPrank();
  }

  AddressKey[] joinKeys;
  GameFuncParams joinParams;

  AddressKey[] throwKeys;
  GameFuncParams throwParams;

  AddressKey[] catchKeys;
  GameFuncParams catchParams;

  function createFunctions() public {
    joinKeys.push(AddressKey(address(mmoSession), 'joinGame'));
    joinKeys.push(AddressKey(address(neighborInteraction), 'joinSession'));
    liveGame.createGameFunction('joinCatch', joinKeys);

    throwKeys.push(AddressKey(address(neighborInteraction), 'throwBall'));
    liveGame.createGameFunction('throwBall', throwKeys);

    catchKeys.push(AddressKey(address(neighborInteraction), 'catchBall'));
    liveGame.createGameFunction('catchBall', catchKeys);
  }

  function clearParams() public {
    delete joinParams.addresses;
    delete joinParams.strings;
    delete joinParams.uints;
    delete throwParams.addresses;
    delete throwParams.strings;
    delete throwParams.uints;
    delete catchParams.addresses;
    delete catchParams.strings;
    delete catchParams.uints;
  }

  function test_joinMMO() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    uint playerCount = neighborInteraction.getPlayerCount(liveGame);

    assertEq(playerCount, 4);
  }

  function test_interaction_starts() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

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
    clearParams();
    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    catchParams.addresses.push(GameFuncAddress('player', address(2)));
    catchParams.uints.push(GameFuncUint('distance', 4));
    liveGame.executeGameFunction('throwBall', catchParams);

    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(2)));
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(1)));
    // // You can catch your own ball that's probably ok.  when we add scoring that'll be a score of 0
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(2)));
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(3)));
    assertEq(true, neighborInteraction.canPlayerCatch(liveGame, address(4)));
  }

  function test_intercept() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    catchParams.addresses.push(GameFuncAddress('player', address(2)));
    catchParams.uints.push(GameFuncUint('distance', 4));
    liveGame.executeGameFunction('throwBall', catchParams);

    catchParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('catchBall', catchParams);

    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(2)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(1)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(2)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(3)));
    assertEq(false, neighborInteraction.canPlayerCatch(liveGame, address(4)));
    assertEq(true, neighborInteraction.canPlayerThrow(liveGame, address(3)));
  }

  function test_multiple_indexes() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    // // 2 people are holding balls (every other player gets one)
    assertEq(neighborInteraction.getBallHolderIndexes(liveGame).length, 2);
    // // player 2 and 4 throws a ball
    catchParams.addresses.push(GameFuncAddress('player', address(2)));
    catchParams.uints.push(GameFuncUint('distance', 4));
    liveGame.executeGameFunction('throwBall', catchParams);

    catchParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('throwBall', catchParams);

    assertEq(neighborInteraction.getBallHolderIndexes(liveGame).length, 0);
    // // and all four players can catch it
    assertEq(neighborInteraction.getCatchableIndexes(liveGame).length, 4);
  }

  function test_self_throw_and_catch() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    throwParams.addresses.push(GameFuncAddress('player', address(2)));
    throwParams.uints.push(GameFuncUint('distance', 4));
    liveGame.executeGameFunction('throwBall', throwParams);

    
    assertEq(false, neighborInteraction.canPlayerThrow(liveGame, address(2)));
    
    // neighborInteraction.catchBall(liveGame, address(2));

    catchParams.addresses.push(GameFuncAddress('player', address(2)));
    liveGame.executeGameFunction('catchBall', catchParams);
    
    
    CatchEntity.Position[] memory catchables = neighborInteraction
      .getCatchableIndexes(liveGame);
    assertEq(catchables.length, 0);
  }

  function test_indexes() public {
    clearParams();

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    uint256 playerIndex = neighborInteraction.getPlayerIndex(
      liveGame,
      address(2)
    );
    assertEq(playerIndex, 1);
    // console.log('testing holders');
    CatchEntity.Position[] memory holders = neighborInteraction
      .getBallHolderIndexes(liveGame);
    assertEq(holders.length, 2);
    assertEq(holders[0].x, 1);
    assertEq(holders[1].x, 3);

    throwParams.addresses.push(GameFuncAddress('player', address(2)));
    throwParams.uints.push(GameFuncUint('distance', 4));
    liveGame.executeGameFunction('throwBall', throwParams);

    console.log('testing catchers');
    holders = neighborInteraction.getBallHolderIndexes(liveGame);
    assertEq(holders.length, 1);
    assertEq(holders[0].x, 3);
    CatchEntity.Position[] memory catchables = neighborInteraction
      .getCatchableIndexes(liveGame);
    assertEq(catchables.length, 4);
    assertEq(catchables[0].x, 0);
    assertEq(catchables[1].x, 1);
    assertEq(catchables[2].x, 2);
    assertEq(catchables[3].x, 3);
  }
}
