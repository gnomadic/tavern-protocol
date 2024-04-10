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

  function setUp() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    EntityFactory entityFactory = new EntityFactory();

    factory = new GameFactory();
    factory.initialize(address(game), address(entityFactory));

    ModuleRegistry registry = new ModuleRegistry();

    hostedPhases = new HostedPhasesModule();
    registry.register(address(hostedPhases));

    hostedSession = new HostedSessionModule();
    registry.register(address(hostedSession));
    HostedSessionEntity hostedSessionEntity = new HostedSessionEntity();
    entityFactory.registerEntity(
      'HostedSessionEntity',
      address(hostedSessionEntity)
    );

    roleManipulation = new RoleManipulationModule();
    registry.register(address(roleManipulation));

    hostedRoles = new HostedRolesModule();
    registry.register(address(hostedRoles));

    hostedVote = new HostedVoteModule();
    registry.register(address(hostedVote));

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
    vm.prank(address(2));
    hostedSession.joinSession(address(1));

    vm.prank(address(3));
    hostedSession.joinSession(address(1));

    vm.prank(address(4));
    hostedSession.joinSession(address(1));
  }

  // function test_startGame() public {
  //   hostedRoles.assignRoles();
  //   hostedPhases.setPhase(1);
  // }
  // function test_RoleManipulate() public {
  //   //get characters by role
  //   uint8 firstRole = hostedRoles.getRole(address(1), address(1));
  //   uint8 secondRole = hostedRoles.getRole(address(1), address(2));
  //   uint8 thirdRole = hostedRoles.getRole(address(1), address(3));
  //   uint8 fourthRole = hostedRoles.getRole(address(1), address(4));

  //   // phase should update every round
  //   vm.prank(address(4));
  //   roleManipulation.manipulate(address(1), address(2));
  //   vm.prank(address(3));
  //   roleManipulation.manipulate(address(1), address(1));
  //   vm.prank(address(2));
  //   roleManipulation.manipulate(address(1), address(4));
  //   vm.prank(address(1));
  //   roleManipulation.manipulate(address(1), address(3));
  // }

  // function test_vote() public {
  //   vm.prank(address(1));
  //   hostedVote.vote(address(1), address(4));

  //   vm.prank(address(2));
  //   hostedVote.vote(address(1), address(3));

  //   vm.prank(address(3));
  //   hostedVote.vote(address(1), address(3));

  //   vm.prank(address(4));
  //   hostedVote.vote(address(1), address(1));

  //   // on a tie they both get voted out
  //   //after the last player votes it's game over, maybe admin can short circuit
  // }
}
