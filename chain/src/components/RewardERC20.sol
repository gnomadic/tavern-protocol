// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary, GameFunction, ConfigFunction} from './interfaces/IComponent.sol';
import {QueueSessionEntity} from '../entities/QueueSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

import {Reward20Entity} from '../entities/Reward20Entity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import {console} from 'forge-std/console.sol';

contract RewardERC20 is IComponent {
  string[] public required = ['winner', 'amount', 'tiePlayer1', 'tiePlayer2'];
  string[] public functions = ['rewardWinner', 'rewardTie'];
  string[] public abis = [
    'rewardWinner(address,address)',
    'rewardTie(address,address)'
  ];

  function initialize(address game) external {
    IGame(game).createEntity('Reward20Entity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    (
      GameFunction[] memory gameFunctions,
      ConfigFunction[] memory configFunctions
    ) = prepare();
    return
      ComponentSummary(
        address(this),
        'Reward ERC20',
        'Allow players to receive rewards in the form of ERC20 tokens',
        gameFunctions,
        configFunctions
      );
  }

  function prepare()
    internal
    pure
    returns (GameFunction[] memory, ConfigFunction[] memory)
  {
    GameFunction[] memory gameFunctions = new GameFunction[](1);
    ConfigFunction[] memory configFunctions = new ConfigFunction[](0);

    string[] memory required = new string[](1);
    required[0] = 'tokenId';
    string[] memory creates = new string[](2);
    creates[0] = 'dailyAction';
    creates[1] = 'lastActionAt';

    GameFunction memory first = GameFunction(
      'Daily Interaction',
      'dailyInteraction(address,address)',
      required,
      creates
    );

    gameFunctions[0] = first;

    return (gameFunctions, configFunctions);
  }

  function setReward(IGame game, address _reward) external {
    Reward20Entity(game.getEntity('rewardAddress')).setReward(_reward);
  }

  function rewardWinner(address executor, address gameAddress) public {
    console.log('reward winner');

    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address player = gameEntity.getPlayerAddress(executor, 'winner');
    if (player != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        player,
        amount
      );
    }
  }

  function rewardTie(address executor, address gameAddress) public {
    console.log('reward tie');
    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

    address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
    address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
    if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        tiePlayer1,
        amount
      );
      Reward20Entity(game.getEntity('rewardAddress')).sendReward(
        tiePlayer2,
        amount
      );
    }
  }

  // // TODO rename to indicate it is sending ^ 18 rewards
  // function reward(address executor, address gameAddress) public {
  //   console.log('rewarding');
  //   IGame game = IGame(gameAddress);

  //   FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
  //   uint256 amount = gameEntity.getPlayerUint(executor, 'amount');

  //   address player = gameEntity.getPlayerAddress(executor, 'winner');
  //   if (player != address(0)) {
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       player,
  //       amount * 10**18
  //     );
  //     return;
  //   }

  //   address tiePlayer1 = gameEntity.getPlayerAddress(executor, 'tie1');
  //   address tiePlayer2 = gameEntity.getPlayerAddress(executor, 'tie2');
  //   if (tiePlayer1 != address(0) && tiePlayer2 != address(0)) {
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       tiePlayer1,
  //       amount * 10**18
  //     );
  //     Reward20Entity(game.getEntity('rewardAddress')).sendReward(
  //       tiePlayer2,
  //       amount * 10**18
  //     );
  //   }
  // }
}
