// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from '../TavernTest.t.sol';
import {QueueSession} from '../../src/components/QueueSession.sol';
import {QueueSessionEntity} from '../../src/entities/QueueSessionEntity.sol';
import {FlowEntity} from '../../src/entities/FlowEntity.sol';
import {RockPaperScissors} from '../../src/components/RockPaperScissors.sol';
import {RockPaperScissorEntity} from '../../src/entities/RockPaperScissorEntity.sol';
import {AddressKey, FlowParams, UintKey} from '../../src/interfaces/IGame.sol';
import {RewardERC20} from '../../src/components/RewardERC20.sol';
import {Reward20Entity} from '../../src/entities/Reward20Entity.sol';
import {Mock20} from '../mocks/Mock20.sol';

contract RockPaperScissorsGame is TavernTest {
  QueueSession queueComponent;
  RockPaperScissors rpsComponent;
  RewardERC20 rewardComponent;
  Mock20 rewardToken;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
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

    liveGame.addComponent(address(queueComponent));
    liveGame.addComponent(address(rpsComponent));
    liveGame.addComponent(address(rewardComponent));
  }
  AddressKey[] joinKeys;
  FlowParams joinParams;

  function createFunctions() public override {
    rewardToken = new Mock20();

    rewardComponent.setReward(address(liveGame), address(rewardToken));

    joinKeys.push(
      AddressKey('setMatchOrWait(address,address)', address(queueComponent))
    );
    joinKeys.push(
      AddressKey('oneOnOne(address,address)', address(rpsComponent))
    );
    joinKeys.push(
      AddressKey('rewardWinner(address,address)', address(rewardComponent))
    );
        joinKeys.push(
      AddressKey('rewardTie(address,address)', address(rewardComponent))
    );

    liveGame.createFlow('playRPS', joinKeys);
  }

  function test_first_join() public {
    vm.expectEmit();

    clearParams(joinParams);

    joinParams.addresses.push(AddressKey('player', address(1)));
    joinParams.uints.push(UintKey('action', 1));

    emit QueueSession.JoinedQueue(address(1), 1);
    vm.prank(address(1));
    liveGame.executeFlow('playRPS', joinParams);

    uint256 playerCount = queueComponent.getPlayerCount(liveGame);
    assertEq(playerCount, 1);

    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      liveGame.getEntity('rockpaperscissors')
    );

    uint256 action = rpsEntity.getPlayerAction(address(1));
    assertEq(action, 1);

    uint256 balance = rewardToken.balanceOf(address(1));
    assertEq(balance, 0);
  }

  function test_second_win() public {
    clearParams(joinParams);

    uint256 balance = rewardToken.balanceOf(address(1));
    assertEq(balance, 0);
    balance = rewardToken.balanceOf(address(2));
    assertEq(balance, 0);

    //player 1 joins with a rock
    joinParams.addresses.push(AddressKey('player', address(1)));
    joinParams.uints.push(UintKey('action', 1));
    
    vm.prank(address(1));
    liveGame.executeFlow('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(AddressKey('player', address(2)));
    joinParams.uints.push(UintKey('action', 2));
    vm.prank(address(2));
    liveGame.executeFlow('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queueComponent.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    FlowEntity game = FlowEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(2));

    balance = rewardToken.balanceOf(address(2));
    assertEq(balance, 3 * 10 ** 18);
  }

  function test_second_lose() public {
    clearParams(joinParams);

    uint256 balance = rewardToken.balanceOf(address(1));
    assertEq(balance, 0);
    balance = rewardToken.balanceOf(address(2));
    assertEq(balance, 0);

    //player 1 joins with a rock
    joinParams.addresses.push(AddressKey('player', address(1)));
    joinParams.uints.push(UintKey('action', 2));
    vm.prank(address(1));
    liveGame.executeFlow('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(AddressKey('player', address(2)));
    joinParams.uints.push(UintKey('action', 1));
    vm.prank(address(2));
    liveGame.executeFlow('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queueComponent.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    FlowEntity game = FlowEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(1));

    balance = rewardToken.balanceOf(address(2));
    assertEq(balance, 0);
    balance = rewardToken.balanceOf(address(1));
    assertEq(balance, 3 * 10 ** 18);
  }

  function test_second_tie() public {
    clearParams(joinParams);

    //player 1 joins with a rock
    joinParams.addresses.push(AddressKey('player', address(1)));
    joinParams.uints.push(UintKey('action', 2));
    vm.prank(address(1));
    liveGame.executeFlow('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(AddressKey('player', address(2)));
    joinParams.uints.push(UintKey('action', 2));
    vm.prank(address(2));
    liveGame.executeFlow('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queueComponent.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    FlowEntity game = FlowEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(0));

    address tie1 = game.getPlayerAddress(address(2), 'tie1');
    address tie2 = game.getPlayerAddress(address(2), 'tie2');

    assertEq(tie1, address(2));
    assertEq(tie2, address(1));

    uint256 balance = rewardToken.balanceOf(address(2));
    assertEq(balance, 1 * 10 ** 18);
    balance = rewardToken.balanceOf(address(1));
    assertEq(balance, 1 * 10 ** 18);
  }

  function deployGame() public {
    liveGame.addComponent(address(queueComponent));
    liveGame.addComponent(address(rpsComponent));
    liveGame.addComponent(address(rewardComponent));

    rewardComponent.setReward(address(liveGame), address(rewardToken));

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
  }
}
