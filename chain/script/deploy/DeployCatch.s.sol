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
import {AddressKey} from '../../src/interfaces/IGame.sol';

// # To deploy and verify Catch on the Tavern protocol run this command below
// forge script script/deploy/DeployCatch.s.sol:DeployCatch --rpc-url sepolia --broadcast --verify -vvvv
contract DeployCatch is Script {
  address GAME_FACTORY = 0x52c6Af5c11ABd9F999ECB89fA750FED6D5fC6Fe1;
  address MODULE_REGISTRY = 0xe1d875dDFDd2bc09454e41154cf427E07ab14028;
  address ENTITY_FACTORY = 0x939f5adfC98652f245c0a8d6a6D2C8688c5f284e;

  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');

    address deployPublicKey = vm.addr(deployerPrivateKey);

    vm.startBroadcast(deployerPrivateKey);

    EntityFactory entityFactory = EntityFactory(ENTITY_FACTORY);

    GameFactory factory = GameFactory(GAME_FACTORY);

    ComponentRegistry registry = ComponentRegistry(MODULE_REGISTRY);

    MMOSessionModule mmoSession = new MMOSessionModule();
    registry.register(address(mmoSession));
    MMOSessionEntity mmoSessionEntity = new MMOSessionEntity();
    entityFactory.registerEntity('MMOSessionEntity', address(mmoSessionEntity));

    MMONeighborInteractionModule neighborInteraction = new MMONeighborInteractionModule();
    registry.register(address(neighborInteraction));

    CatchEntity catchEntity = new CatchEntity();
    entityFactory.registerEntity('CatchEntity', address(catchEntity));

    factory.createGame(deployPublicKey, 'Catch Demo');
    Game liveGame = factory.games(0);

    liveGame.addComponent(address(mmoSession));
    liveGame.addComponent(address(neighborInteraction));

    joinKeys.push(AddressKey(address(mmoSession), 'joinGame'));
    joinKeys.push(AddressKey(address(neighborInteraction), 'joinSession'));
    liveGame.createGameFunction('joinCatch', joinKeys);

    throwKeys.push(AddressKey(address(neighborInteraction), 'throwBall'));
    liveGame.createGameFunction('throwBall', throwKeys);

    catchKeys.push(AddressKey(address(neighborInteraction), 'catchBall'));
    liveGame.createGameFunction('catchBall', catchKeys);

    // neighborInteraction.joinSession(liveGame, address(1));
    // neighborInteraction.joinSession(liveGame, address(2));
    // neighborInteraction.joinSession(liveGame, address(3));
    // neighborInteraction.joinSession(liveGame, address(4));
    // neighborInteraction.joinSession(liveGame, address(5));
    // neighborInteraction.joinSession(liveGame, address(6));
    // neighborInteraction.joinSession(liveGame, address(7));
    // neighborInteraction.joinSession(liveGame, address(8));
    // neighborInteraction.joinSession(liveGame, address(9));
    // neighborInteraction.joinSession(liveGame, address(10));
    // neighborInteraction.joinSession(liveGame, address(11));
    // neighborInteraction.joinSession(liveGame, address(12));
    // neighborInteraction.joinSession(liveGame, address(13));
    // neighborInteraction.joinSession(liveGame, address(14));
    // neighborInteraction.joinSession(liveGame, address(15));
    // neighborInteraction.joinSession(liveGame, address(16));
    // neighborInteraction.joinSession(liveGame, address(17));

    vm.stopBroadcast();
  }

  AddressKey[] joinKeys;
  AddressKey[] throwKeys;
  AddressKey[] catchKeys;

  function createFunctions() public {}
}
