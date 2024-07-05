// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from '../TavernTest.t.sol';
import {DailyInteraction} from '../../src/components/DailyInteraction.sol';
import {DailyInteractionEntity} from '../../src/entities/DailyInteractionEntity.sol';
import {FlowEntity} from '../../src/entities/FlowEntity.sol';

import {AddressKey, FlowParams} from '../../src/interfaces/IGame.sol';

contract DailyInteractionTest is TavernTest {
  DailyInteraction component;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
    component = new DailyInteraction(
      'http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json'
    );
    registry.register(address(component));

    DailyInteractionEntity entity = new DailyInteractionEntity();
    entityFactory.registerEntity('DailyInteractionEntity', address(entity));

    liveGame.addComponent(address(component));
  }

  AddressKey[] joinKeys;
  FlowParams joinParams;

  function createFunctions() public override {
    // console.log("queue at: " , address(queue));
    joinKeys.push(
      AddressKey('dailyInteraction(address,address)', address(component))
    );

    liveGame.createFlow('interact', joinKeys);
  }

  function test_first_interaction() public {
    clearParams(joinParams);

    uint256 last = component.getPlayersLastActionAt(
      address(liveGame),
      address(1)
    );
    assertEq(last, 0);

    joinParams.addresses.push(AddressKey('player', address(1)));
    liveGame.executeFlow('interact', joinParams);

    last = component.getPlayersLastActionAt(address(liveGame), address(1));

    assertEq(last, 1);

    uint256 total = component.getPlayersTotalActions(
      address(liveGame),
      address(1)
    );

    assertEq(total, 1);
  }

  function test_second_interaction() public {
    clearParams(joinParams);

    joinParams.addresses.push(AddressKey('player', address(1)));
    liveGame.executeFlow('interact', joinParams);

    vm.expectRevert();
    liveGame.executeFlow('interact', joinParams);

    uint256 total = component.getPlayersTotalActions(
      address(liveGame),
      address(1)
    );

    assertEq(total, 1);
  }
}
