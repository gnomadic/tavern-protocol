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
  address GAME_FACTORY = 0xAb674876bf497Db3E0C52B995D38c67536d14B67;
  address MODULE_REGISTRY = 0x4AeA256fD2b36A073AD4cB10b0A9B926259C66CE;
  address ENTITY_FACTORY = 0x85D72A40029f59712c73f56DEb2855Ff54aB61A6;

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

    queueComponent = new QueueSession("http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json");
    registry.register(address(queueComponent));
    QueueSessionEntity queueEntity = new QueueSessionEntity();
    entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

    rpsComponent = new RockPaperScissors("http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json");
    registry.register(address(rpsComponent));
    RockPaperScissorEntity rpsEntity = new RockPaperScissorEntity();
    entityFactory.registerEntity('RockPaperScissorEntity', address(rpsEntity));

    rewardComponent = new RewardERC20("http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json");
    registry.register(address(rewardComponent));
    Reward20Entity rewardEntity = new Reward20Entity();
    entityFactory.registerEntity('Reward20Entity', address(rewardEntity));

    factory.createGame(deployPublicKey, 'http://ipfs.io/ipfs/QmUXhiGQsawmyaAJ1zdiGEANbW3WAVSdJYrqosX6RTvgLC/template.json');
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
