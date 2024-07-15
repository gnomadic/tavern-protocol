// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from '../TavernTest.t.sol';
import {QueueSession} from '../../src/components/QueueSession.sol';
import {QueueSessionEntity} from '../../src/entities/QueueSessionEntity.sol';
import {FlowEntity} from '../../src/entities/FlowEntity.sol';

import {AddressKey, FlowParams} from '../../src/interfaces/IGame.sol';

contract QueueSessionTest is TavernTest {
  QueueSession queue;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
    queue = new QueueSession("http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json");
    registry.register(address(queue));
    QueueSessionEntity queueEntity = new QueueSessionEntity();
    entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

    liveGame.addComponent(address(queue));
  }

  AddressKey[] joinKeys;
  FlowParams joinParams;

  function createFunctions() public override {
    // console.log("queue at: " , address(queue));
    joinKeys.push(
      AddressKey('setMatchOrWait(address,address)', address(queue))
    );

    liveGame.createFlow('matchGame', joinKeys);
  }

  function test_first_join() public {
    clearParams(joinParams);

    joinParams.addresses.push(AddressKey('player', address(1)));
    liveGame.executeFlow('matchGame', joinParams);

    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 1);
  }

  function test_second_join() public {
    clearParams(joinParams);

    joinParams.addresses.push(AddressKey('player', address(1)));
    vm.prank(address(1));
    liveGame.executeFlow('matchGame', joinParams);

    joinParams.addresses[0].value = address(2);
    vm.prank(address(2));
    liveGame.executeFlow('matchGame', joinParams);

    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    FlowEntity game = FlowEntity(liveGame.getEntity('playerParams'));
    address player1 = game.getPlayerAddress(address(2), 'player1');
    address player2 = game.getPlayerAddress(address(2), 'player2');

    assertEq(address(1), player2);
    assertEq(address(2), player1);
  }
}
