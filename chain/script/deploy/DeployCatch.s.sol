// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from 'forge-std/Script.sol';

import {GameFactory} from '../../src/GameFactory.sol';
import {Game} from '../../src/Game.sol';
import {IGame} from '../../src/interfaces/IGame.sol';
import {ModuleRegistry} from '../../src/ModuleRegistry.sol';
import {DailyInteractionModule} from '../../src/modules/DailyInteractionModule.sol';
import {UnOptNumberEntity721} from '../../src/entities/UnOptNumberEntity721.sol';
import {EntityFactory} from '../../src/EntityFactory.sol';
import {MMOSessionModule} from '../../src/modules/MMOSessionModule.sol';
import {MMONeighborInteractionModule} from '../../src/modules/MMONeighborInteractionModule.sol';
import {MMOSessionEntity} from '../../src/entities/MMOSessionEntity.sol';
import {MMONeighborInteractionEntity} from '../../src/entities/MMONeighborInteractionEntity.sol';

// # To deploy and verify Catch on the PLAYMINT protocol run this command below
// forge script script/deploy/DeployCatch.s.sol:DeployCatch --rpc-url sepolia --broadcast --verify -vvvv
contract DeployCatch is Script {


 address MODULE_REGISTRY = 0x9797d01A7084b101bB0ccCEADDa99138279879d6;
 address ENTITY_FACTORY = 0x90e8126A0b4e8cA96376B47Eb8361f2D384B4779;
 address GAME_FACTORY = 0xBC92fb92dD7725dd79e48a7bE5E52F37965cDdE5;


  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');

    address deployPublicKey = vm.addr(deployerPrivateKey);

    vm.startBroadcast(deployerPrivateKey);

    EntityFactory entityFactory =  EntityFactory(ENTITY_FACTORY);

    GameFactory factory =  GameFactory(GAME_FACTORY);

    ModuleRegistry registry =  ModuleRegistry(MODULE_REGISTRY);

    // MMOSessionModule mmoSession = new MMOSessionModule();
    // registry.register(address(mmoSession));
    // MMOSessionEntity mmoSessionEntity = new MMOSessionEntity();
    // entityFactory.registerEntity('MMOSessionEntity', address(mmoSessionEntity));

    MMONeighborInteractionModule neighborInteraction = new MMONeighborInteractionModule();
    registry.register(address(neighborInteraction));
    MMONeighborInteractionEntity neighborInteractionEntity = new MMONeighborInteractionEntity();
    entityFactory.registerEntity(
      'MMONeighborInteractionEntity',
      address(neighborInteractionEntity)
    );

    factory.createGame(deployPublicKey, 'Catch');
    IGame liveGame = factory.games(0);

    // liveGame.addModule(address(mmoSession));
    liveGame.addModule(address(neighborInteraction));



    vm.stopBroadcast();
  }
}
