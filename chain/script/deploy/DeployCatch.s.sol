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
// import {MMONeighborInteractionEntity} from '../../src/entities/MMONeighborInteractionEntity.sol';
import {CatchEntity} from '../../src/entities/CatchEntity.sol';

// # To deploy and verify Catch on the PLAYMINT protocol run this command below
// forge script script/deploy/DeployCatch.s.sol:DeployCatch --rpc-url sepolia --broadcast --verify -vvvv
contract DeployCatch is Script {
  address GAME_FACTORY = 0xF3842610B762022A01ec8beD285006d8Ec29b947;
  address MODULE_REGISTRY = 0x5D0b179017160c2EC8F9E7B37a9d37EB1A06d399;
  address ENTITY_FACTORY = 0x72138E255061326C29E7A60BB8eff9A1ce523445;

  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');

    address deployPublicKey = vm.addr(deployerPrivateKey);

    vm.startBroadcast(deployerPrivateKey);

    EntityFactory entityFactory = EntityFactory(ENTITY_FACTORY);

    GameFactory factory = GameFactory(GAME_FACTORY);

    ModuleRegistry registry = ModuleRegistry(MODULE_REGISTRY);

    MMOSessionModule mmoSession = new MMOSessionModule();
    registry.register(address(mmoSession));
    MMOSessionEntity mmoSessionEntity = new MMOSessionEntity();
    entityFactory.registerEntity('MMOSessionEntity', address(mmoSessionEntity));

    MMONeighborInteractionModule neighborInteraction = new MMONeighborInteractionModule();
    registry.register(address(neighborInteraction));

    CatchEntity catchEntity = new CatchEntity();
    entityFactory.registerEntity('CatchEntity', address(catchEntity));

    factory.createGame(deployPublicKey, 'Catch Demo');
    IGame liveGame = factory.games(0);

    liveGame.addModule(address(mmoSession));
    liveGame.addModule(address(neighborInteraction));

    neighborInteraction.joinSession(liveGame, address(1));
    neighborInteraction.joinSession(liveGame, address(2));
    neighborInteraction.joinSession(liveGame, address(3));
    neighborInteraction.joinSession(liveGame, address(4));
    neighborInteraction.joinSession(liveGame, address(5));
    neighborInteraction.joinSession(liveGame, address(6));
    neighborInteraction.joinSession(liveGame, address(7));
    neighborInteraction.joinSession(liveGame, address(8));
    neighborInteraction.joinSession(liveGame, address(9));
    neighborInteraction.joinSession(liveGame, address(10));
    neighborInteraction.joinSession(liveGame, address(11));
    neighborInteraction.joinSession(liveGame, address(12));
    neighborInteraction.joinSession(liveGame, address(13));
    neighborInteraction.joinSession(liveGame, address(14));
    neighborInteraction.joinSession(liveGame, address(15));
    neighborInteraction.joinSession(liveGame, address(16));
    neighborInteraction.joinSession(liveGame, address(17));

    vm.stopBroadcast();
  }
}
