// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernTest} from './TavernTest.t.sol';
import {QueueSession} from '../src/components/QueueSession.sol';
import {QueueSessionEntity} from '../src/entities/QueueSessionEntity.sol';

import {RockPaperScissors} from '../src/components/RockPaperScissors.sol';
import {RockPaperScissorEntity} from '../src/entities/RockPaperScissorEntity.sol';
import {AddressKey, GameFuncParams, GameFuncAddress, GameFuncUint} from '../src/interfaces/IGame.sol';
import {GameEntity} from '../src/entities/GameEntity.sol';
import {RewardERC20} from '../src/components/RewardERC20.sol';
import {Reward20Entity} from '../src/entities/Reward20Entity.sol';
import {Mock20} from './mocks/Mock20.sol';

contract RockPaperScissorsGame is TavernTest {
  QueueSession queue;
  RockPaperScissors rps;
  RewardERC20 reward;
  Mock20 token;

  function setUp() public {
    deployTavern();
  }

  function loadModules() public override {
    queue = new QueueSession();
    registry.register(address(queue));
    QueueSessionEntity queueEntity = new QueueSessionEntity();
    entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

    rps = new RockPaperScissors();
    registry.register(address(rps));
    RockPaperScissorEntity rpsEntity = new RockPaperScissorEntity();
    entityFactory.registerEntity('RockPaperScissorEntity', address(rpsEntity));

    reward = new RewardERC20();
    registry.register(address(reward));
    Reward20Entity rewardEntity = new Reward20Entity();
    entityFactory.registerEntity('Reward20Entity', address(rewardEntity));

    liveGame.addComponent(address(queue));
    liveGame.addComponent(address(rps));
    liveGame.addComponent(address(reward));
  }
  AddressKey[] joinKeys;
  GameFuncParams joinParams;

  function createFunctions() public override {
    token = new Mock20();

    reward.setReward(liveGame, address(token));

    joinKeys.push(
      AddressKey(address(queue), 'setMatchOrWait(address,address)')
    );
    joinKeys.push(AddressKey(address(rps), 'oneOnOne(address,address)'));
    joinKeys.push(AddressKey(address(reward), 'reward(address,address)'));

    liveGame.createGameFunction('playRPS', joinKeys);
  }

  function test_first_join() public {
    clearParams(joinParams);

    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    joinParams.uints.push(GameFuncUint('action', 1));
    liveGame.executeGameFunction('playRPS', joinParams);

    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 1);

    RockPaperScissorEntity rpsEntity = RockPaperScissorEntity(
      liveGame.getEntity('actions')
    );

    uint256 action = rpsEntity.getPlayerAction(address(1));
    assertEq(action, 1);
  }

  function test_second_win() public {
    clearParams(joinParams);

    uint256 balance = token.balanceOf(address(1));
    assertEq(balance, 0);
    balance = token.balanceOf(address(2));
    assertEq(balance, 0);

    //player 1 joins with a rock
    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    joinParams.uints.push(GameFuncUint('action', 1));
    vm.prank(address(1));
    liveGame.executeGameFunction('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(GameFuncAddress('player', address(2)));
    joinParams.uints.push(GameFuncUint('action', 2));
    vm.prank(address(2));
    liveGame.executeGameFunction('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    GameEntity game = GameEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(2));

    balance = token.balanceOf(address(2));
    assertEq(balance, 3);
  }

  function test_second_lose() public {
    clearParams(joinParams);

    uint256 balance = token.balanceOf(address(1));
    assertEq(balance, 0);
    balance = token.balanceOf(address(2));
    assertEq(balance, 0);

    //player 1 joins with a rock
    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    joinParams.uints.push(GameFuncUint('action', 2));
    vm.prank(address(1));
    liveGame.executeGameFunction('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(GameFuncAddress('player', address(2)));
    joinParams.uints.push(GameFuncUint('action', 1));
    vm.prank(address(2));
    liveGame.executeGameFunction('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    GameEntity game = GameEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(1));

    balance = token.balanceOf(address(2));
    assertEq(balance, 0);
    balance = token.balanceOf(address(1));
    assertEq(balance, 3);
  }

  function test_second_tie() public {
    clearParams(joinParams);

    //player 1 joins with a rock
    joinParams.addresses.push(GameFuncAddress('player', address(1)));
    joinParams.uints.push(GameFuncUint('action', 2));
    vm.prank(address(1));
    liveGame.executeGameFunction('playRPS', joinParams);

    //player 2 joins with a paper
    joinParams.addresses.push(GameFuncAddress('player', address(2)));
    joinParams.uints.push(GameFuncUint('action', 2));
    vm.prank(address(2));
    liveGame.executeGameFunction('playRPS', joinParams);

    // queue should be empty because they should have matched
    uint256 playerCount = queue.getPlayerCount(liveGame);
    assertEq(playerCount, 0);

    // paper beats rocks
    GameEntity game = GameEntity(liveGame.getEntity('playerParams'));
    address winner = game.getPlayerAddress(address(2), 'winner');
    assertEq(winner, address(0));

    address tie1 = game.getPlayerAddress(address(2), 'tie1');
    address tie2 = game.getPlayerAddress(address(2), 'tie2');

    assertEq(tie1, address(2));
    assertEq(tie2, address(1));

    uint256 balance = token.balanceOf(address(2));
    assertEq(balance, 1);
    balance = token.balanceOf(address(1));
    assertEq(balance, 1);
  }
}
