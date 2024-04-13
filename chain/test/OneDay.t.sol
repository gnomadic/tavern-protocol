// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {UnOptNumberEntity721} from '../src/entities/UnOptNumberEntity721.sol';
import {Game} from '../src/Game.sol';
import {MockNFT} from './MockNFT.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {DeployProtocol} from '../script/deploy/DeployProtocol.s.sol';
import {ModuleRegistry} from '../src/ModuleRegistry.sol';
import {EntityFactory} from '../src/EntityFactory.sol';
import {IGame} from '../src/interfaces/IGame.sol';
import {HostedPhasesModule} from '../src/modules/HostedPhasesModule.sol';
import {HostedSessionModule} from '../src/modules/HostedSessionModule.sol';
import {RoleManipulationModule} from '../src/modules/RoleManipulationModule.sol';
import {HostedRolesModule} from '../src/modules/HostedRolesModule.sol';
import {HostedVoteModule} from '../src/modules/HostedVoteModule.sol';
import {HostedSessionEntity} from '../src/entities/HostedSessionEntity.sol';
import {HostedRolesEntity} from '../src/entities/HostedRolesEntity.sol';
import {HostedPhasesEntity} from '../src/entities/HostedPhasesEntity.sol';
import {HostedManipulateRoleEntity} from '../src/entities/HostedManipulateRoleEntity.sol';
import {HostedVoteEntity} from '../src/entities/HostedVoteEntity.sol';


import "forge-std/console.sol";
contract OneDay is Test {
  // ok so in this test.
  // setup will create a game, and assign the modules to the game.
  // assigning the modules should create the entites automatically.

  // then into the tests.
  // player can create a game
  // other players can join the game
  // game can start
  // roles are assigned
  // phase is set
  // playesr can perform their actions and incrmeent the phase
  // players can vote
  // game can end

  GameFactory factory;
  IGame liveGame;

  HostedSessionModule hostedSession;
  HostedPhasesModule hostedPhases;
  RoleManipulationModule roleManipulation;
  HostedRolesModule hostedRoles;
  HostedVoteModule hostedVote;

  string[] roleNames;
  string[] funcNames;

  function setUp() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    EntityFactory entityFactory = new EntityFactory();

    factory = new GameFactory();
    factory.initialize(address(game), address(entityFactory));

    ModuleRegistry registry = new ModuleRegistry();

    console.log("hosted session");

    hostedSession = new HostedSessionModule();
    registry.register(address(hostedSession));
    HostedSessionEntity hostedSessionEntity = new HostedSessionEntity();
    entityFactory.registerEntity(
      'HostedSessionEntity',
      address(hostedSessionEntity)
    );
console.log("hosted roles");
    hostedRoles = new HostedRolesModule();
    registry.register(address(hostedRoles));
    HostedRolesEntity hostedRolesEntity = new HostedRolesEntity();
    entityFactory.registerEntity(
      'HostedRolesEntity',
      address(hostedRolesEntity)
    );
console.log("hosted phases");
    hostedPhases = new HostedPhasesModule();
    registry.register(address(hostedPhases));
    HostedPhasesEntity hostedPhasesEntity = new HostedPhasesEntity();
    entityFactory.registerEntity(
      'HostedPhasesEntity',
      address(hostedPhasesEntity)
    );
console.log("hosted manipulation");
    roleManipulation = new RoleManipulationModule();
    registry.register(address(roleManipulation));
    HostedManipulateRoleEntity hostedManipulateRoleEntity = new HostedManipulateRoleEntity();
    entityFactory.registerEntity(
      'HostedManipulateRoleEntity',
      address(hostedManipulateRoleEntity)
    );

console.log("hosted vote");
    hostedVote = new HostedVoteModule();
    registry.register(address(hostedVote));
    HostedVoteEntity hostedVoteEntity = new HostedVoteEntity();
    entityFactory.registerEntity(
      'HostedVoteEntity',
      address(hostedVoteEntity)
    );

    UnOptNumberEntity721 basicEntity = new UnOptNumberEntity721();
    entityFactory.updateEntityContract(address(basicEntity));

    factory.createGame(address(1), 'one day ultimate degen');
    liveGame = factory.games(0);

    liveGame.addModule(address(hostedPhases));
    liveGame.addModule(address(hostedSession));
    liveGame.addModule(address(roleManipulation));
    liveGame.addModule(address(hostedRoles));
    liveGame.addModule(address(hostedVote));

    hostedSession.setGameConfig(liveGame, 4);
    roleNames.push('normie');
    funcNames.push('doNothing');
    roleNames.push('degen');
    funcNames.push('broadcastRole');
    roleNames.push('trader');
    funcNames.push('swapMyCard');
    roleNames.push('sniperbot');
    funcNames.push('swapCards');

    hostedRoles.setGameConfig(liveGame, roleNames, funcNames);

    hostedPhases.setGameConfig(liveGame, roleNames);

    vm.stopPrank();
  }

  // function test_createGame() public {
  //   assertEq(liveGame.getSummary().displayName, 'one day ultimate degen');
  //   // liveGame.addModule(address(hostedPhases));
  //   // liveGame.addModule(address(hostedSession));
  //   // liveGame.addModule(address(roleManipulation));
  //   // liveGame.addModule(address(hostedRoles));
  //   // liveGame.addModule(address(hostedVote));
  // }

  function test_createSession() public {
    vm.prank(address(1));
    hostedSession.createSession(liveGame);
  }

  function test_joinSession() public {
    vm.prank(address(1));
    hostedSession.createSession(liveGame);

    vm.prank(address(2));
    hostedSession.joinSession(liveGame, address(1));

    vm.prank(address(3));
    hostedSession.joinSession(liveGame, address(1));

    vm.prank(address(4));
    hostedSession.joinSession(liveGame, address(1));

    uint playerCount = hostedSession
      .getSessionPlayers(liveGame, address(1))
      .length;

    assertEq(playerCount, 4);
  }

  function test_startGame() public {
    test_joinSession();
    hostedRoles.assignRoles(liveGame, address(1));
    vm.prank(address(1));
    uint playerOneRole = hostedRoles.getRole(liveGame, address(1)) ;
    vm.prank(address(2));
    uint playerTwoRole = hostedRoles.getRole(liveGame, address(1));
    vm.prank(address(3));
    uint playerThreeRole = hostedRoles.getRole(
      liveGame,
      address(1)
    );
    vm.prank(address(4));
    uint playerFourRole = hostedRoles.getRole(liveGame, address(1));

    assertNotEq(playerOneRole, playerTwoRole);
    assertNotEq(playerOneRole, playerThreeRole);
    assertNotEq(playerOneRole, playerFourRole);
    assertNotEq(playerTwoRole, playerThreeRole);
    assertNotEq(playerTwoRole, playerFourRole);
    assertNotEq(playerThreeRole, playerFourRole);

    
  }

  function test_RoleManipulate() public {
    //get characters by role
    vm.prank(address(1));
    uint8 firstRole = hostedRoles.getRole(liveGame, address(1));
    vm.prank(address(2));
    uint8 secondRole = hostedRoles.getRole(liveGame, address(1));
    vm.prank(address(3));
    uint8 thirdRole = hostedRoles.getRole(liveGame, address(1));
    vm.prank(address(4));
    uint8 fourthRole = hostedRoles.getRole(liveGame, address(1));

    // phase should update every round
    vm.prank(address(4));
    roleManipulation.manipulate(liveGame, address(1), address(2), address(0));
    vm.prank(address(3));
    roleManipulation.manipulate(liveGame, address(1), address(1), address(0));
    vm.prank(address(2));
    roleManipulation.manipulate(liveGame, address(1), address(4), address(0));
    vm.prank(address(1));
    roleManipulation.manipulate(liveGame, address(1), address(3), address(0));
  }

  function test_vote() public {
    vm.prank(address(1));
    hostedVote.vote(liveGame, address(1), address(4));

    vm.prank(address(2));
    hostedVote.vote(liveGame, address(1), address(3));

    vm.prank(address(3));
    hostedVote.vote(liveGame, address(1), address(3));

    vm.prank(address(4));
    hostedVote.vote(liveGame, address(1), address(1));

    // on a tie they both get voted out
    //after the last player votes it's game over, maybe admin can short circuit
  }
}
