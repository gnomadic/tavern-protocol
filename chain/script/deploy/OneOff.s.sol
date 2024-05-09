// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from 'forge-std/Script.sol';

import {GameFactory} from '../../src/GameFactory.sol';
import {Game} from '../../src/Game.sol';
import {IGame} from '../../src/interfaces/IGame.sol';
import {ComponentRegistry} from '../../src/ComponentRegistry.sol';
import {DailyInteractionModule} from '../../src/components/DailyInteractionModule.sol';
import {EntityFactory} from '../../src/EntityFactory.sol';
import {MMOSessionModule} from '../../src/components/MMOSessionModule.sol';
import {MMONeighborInteractionModule} from '../../src/components/MMONeighborInteractionModule.sol';
import {MMOSessionEntity} from '../../src/entities/MMOSessionEntity.sol';
// import {MMONeighborInteractionEntity} from '../../src/entities/MMONeighborInteractionEntity.sol';
import {CatchEntity} from '../../src/entities/CatchEntity.sol';
import {AddressKey, FlowParams} from '../../src/interfaces/IGame.sol';

// # To deploy and verify Catch on the Tavern protocol run this command below
// forge script script/deploy/OneOff.s.sol:OneOff --rpc-url sepolia --broadcast --verify -vvvv
contract OneOff is Script {
  address GAME_FACTORY = 0x44AAA1DcD6DdE7480ADe1281C4376ce484C8a319;
  address MODULE_REGISTRY = 0x4e3F48C28c28E2Fa3718eFFe3579dc302a3EE7ae;
  address ENTITY_FACTORY = 0xD89B03B60D161661142c2Fe24EA57ea430eC82c4;

  FlowParams joinParams;

  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');


    vm.startBroadcast(deployerPrivateKey);


    GameFactory factory = GameFactory(GAME_FACTORY);





    Game liveGame = factory.games(0);

  

    vm.stopBroadcast();
  }



}
