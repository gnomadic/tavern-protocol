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

import {QueueSession} from '../../src/components/QueueSession.sol';
import {RockPaperScissors} from '../../src/components/RockPaperScissors.sol';
import {RewardERC20} from '../../src/components/RewardERC20.sol';
import {QueueSessionEntity} from '../../src/entities/QueueSessionEntity.sol';
import {RockPaperScissorEntity} from '../../src/entities/RockPaperScissorEntity.sol';
import {Reward20Entity} from '../../src/entities/Reward20Entity.sol';

// # To deploy and verify Catch on the Tavern protocol run this command below
// forge script script/deploy/DeployCatch.s.sol:DeployCatch --rpc-url sepolia --broadcast --verify -vvvv
contract DeployRPS is Script {
  address GAME_FACTORY = 0x8c8A01c135004b392eF742cf40088355f5B74fb3;
  address MODULE_REGISTRY = 0xfaA8c35840B62EEED38Dc625290352663D18f3A1;
  address ENTITY_FACTORY = 0x5b74d2a71618efed7fC2519D554082008DCbe95A;

  function run() external {
    uint256 deployerPrivateKey = vm.envUint('MAINNET_PRIVATE_KEY');

    address deployPublicKey = vm.addr(deployerPrivateKey);

    vm.startBroadcast(deployerPrivateKey);

    EntityFactory entityFactory = EntityFactory(ENTITY_FACTORY);
    GameFactory factory = GameFactory(GAME_FACTORY);
    ComponentRegistry registry = ComponentRegistry(MODULE_REGISTRY);

    //----------------

    QueueSession queueComponent;
    RockPaperScissors rpsComponent;
    RewardERC20 rewardComponent;
    // Mock20 rewardToken;

    queueComponent = new QueueSession();
    registry.register(address(queueComponent));
    QueueSessionEntity queueEntity = new QueueSessionEntity();
    entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

    rpsComponent = new RockPaperScissors();
    registry.register(address(rpsComponent));
    RockPaperScissorEntity rpsEntity = new RockPaperScissorEntity();
    entityFactory.registerEntity('RockPaperScissorEntity', address(rpsEntity));

    rewardComponent = new RewardERC20();
    registry.register(address(rewardComponent));
    Reward20Entity rewardEntity = new Reward20Entity();
    entityFactory.registerEntity('Reward20Entity', address(rewardEntity));

    factory.createGame(deployPublicKey, 'Rock Paper Scissor Demo');
    Game liveGame = factory.games(0);

    liveGame.addComponent(address(queueComponent));
    liveGame.addComponent(address(rpsComponent));
    liveGame.addComponent(address(rewardComponent));

    // rewardToken = new Mock20();

    // rewardComponent.setReward(liveGame, address(rewardToken));

    joinKeys.push(
      AddressKey('setMatchOrWait(address,address)', address(queueComponent))
    );
    joinKeys.push(
      AddressKey('oneOnOne(address,address)', address(rpsComponent))
    );
    joinKeys.push(
      AddressKey('reward(address,address)', address(rewardComponent))
    );

    liveGame.createFlow('playRPS', joinKeys);

    // ----------------

    vm.stopBroadcast();
  }

  AddressKey[] joinKeys;
  AddressKey[] throwKeys;
  AddressKey[] catchKeys;

  function createFunctions() public {}
}
