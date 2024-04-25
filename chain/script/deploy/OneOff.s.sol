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
import {AddressKey, GameFuncParams, GameFuncAddress} from '../../src/interfaces/IGame.sol';

// # To deploy and verify Catch on the Tavern protocol run this command below
// forge script script/deploy/OneOff.s.sol:OneOff --rpc-url sepolia --broadcast --verify -vvvv
contract OneOff is Script {
  address GAME_FACTORY = 0x44AAA1DcD6DdE7480ADe1281C4376ce484C8a319;
  address MODULE_REGISTRY = 0x4e3F48C28c28E2Fa3718eFFe3579dc302a3EE7ae;
  address ENTITY_FACTORY = 0xD89B03B60D161661142c2Fe24EA57ea430eC82c4;

  GameFuncParams joinParams;

  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');


    vm.startBroadcast(deployerPrivateKey);


    GameFactory factory = GameFactory(GAME_FACTORY);





    Game liveGame = factory.games(0);

  

    // IGame liveGame = factory.games(0);

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(2));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(3));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(4));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(5));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(6));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(7));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(8));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(9));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(10));
    liveGame.executeGameFunction('joinCatch', joinParams);

    joinParams.addresses[0] = GameFuncAddress('player', address(11));
    liveGame.executeGameFunction('joinCatch', joinParams);

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



}
