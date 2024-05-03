// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from './TavernTest.t.sol';
import {QueueSession} from '../src/components/QueueSession.sol';
import {QueueSessionEntity} from '../src/entities/QueueSessionEntity.sol';
import {FlowEntity} from '../src/entities/FlowEntity.sol';

import {AddressKey, GameFuncParams, GameFuncAddress} from '../src/interfaces/IGame.sol';

contract QueueSessionTest is TavernTest {
  QueueSession queue;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
    queue = new QueueSession();
    registry.register(address(queue));
    QueueSessionEntity queueEntity = new QueueSessionEntity();
    entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

    liveGame.addComponent(address(queue));
  }

  AddressKey[] joinKeys;
  GameFuncParams joinParams;

  function createFunctions() public override {

    // console.log("queue at: " , address(queue));
    joinKeys.push(AddressKey(address(queue), 'setMatchOrWait(address,address)'));

    liveGame.createGameFunction('matchGame', joinKeys);
  }

  function test_first_join() public {
    clearParams(joinParams);

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('matchGame', joinParams);

    uint256 playerCount = queue.getPlayerCount(liveGame);    
    assertEq(playerCount, 1);
  }

  function test_second_join() public{
    clearParams(joinParams);

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    vm.prank(address(1));
    liveGame.executeGameFunction('matchGame', joinParams);

    joinParams.addresses[0].value = address(2);
    vm.prank(address(2));
    liveGame.executeGameFunction('matchGame', joinParams);

    uint256 playerCount = queue.getPlayerCount(liveGame);    
    assertEq(playerCount, 0);

    FlowEntity game = FlowEntity(liveGame.getEntity("playerParams"));
    address player1 = game.getPlayerAddress(address(2), 'player1');
    
    address player2 = game.getPlayerAddress(address(2), 'player2');

    assertEq(address(1), player2);
    assertEq(address(2), player1);
  }
}
