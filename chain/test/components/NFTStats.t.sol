// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from '../TavernTest.t.sol';
import {NFTStats} from '../../src/components/NFTStats.sol';
import {NFTStatsEntity} from '../../src/entities/NFTStatsEntity.sol';
import {FlowEntity} from '../../src/entities/FlowEntity.sol';

import {AddressKey, UintKey, FlowParams} from '../../src/interfaces/IGame.sol';

contract NFTStatsTest is TavernTest {
  NFTStats component;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
    component = new NFTStats(
      'http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json'
    );
    registry.register(address(component));

    NFTStatsEntity entity = new NFTStatsEntity();
    entityFactory.registerEntity('NFTStatsEntity', address(entity));

    liveGame.addComponent(address(component));
  }

  AddressKey[] joinKeys;
  FlowParams joinParams;

  function createFunctions() public override {
    // console.log("queue at: " , address(queue));
    joinKeys.push(
      AddressKey('loadStats(address,address)', address(component))
    );

    liveGame.createFlow('load', joinKeys);

    delete joinKeys;

    
  }

  function test_valid_params() public {
    // clearParams(joinParams);

    // joinParams.uints.push(UintKey('action', 1));
    // vm.prank(address(1));
    // liveGame.executeFlow('interact', joinParams);
  
  }

  function test_invalid_params() public {
    // clearParams(joinParams);

    // joinParams.uints.push(UintKey('action', 1));
    // joinParams.uints.push(UintKey('invalid', 1));
    // vm.prank(address(1));
    // vm.expectRevert();
    // liveGame.executeFlow('interact', joinParams);
  }


}
