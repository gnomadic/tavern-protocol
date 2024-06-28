// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';
import {DailyInteractionEntity} from '../entities/DailyInteractionEntity.sol';
import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import 'forge-std/console.sol';

contract DailyInteraction is IComponent, Initializable {

  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
        IGame(game).createEntity('DailyInteractionEntity');

  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function dailyInteraction(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {
          console.log("daily interaction");

    IGame game = IGame(gameAddress);

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    address player = gameEntity.getPlayerAddress(executor, 'player');

    DailyInteractionEntity entity = DailyInteractionEntity(
      game.getEntity('dailyActions')
    );
              console.log("got entity at: ", address(entity));

    uint256 lastActionAt = entity.getLastActionAt(player);

              console.log("last action at ", lastActionAt);


    if (lastActionAt != 0 && block.timestamp - lastActionAt < 14 hours) {
      console.log("failed");
      gameEntity.setFailure('Not enough time has passed');
    }
    uint256 dailyActions = entity.getDailyActions(player);
    entity.updateDailyActions(player,  dailyActions + 1);
    entity.updateLastActionAt(player, block.timestamp);

    gameEntity.addPlayerUint(executor, "totalActions", entity.getDailyActions(player));
  }

}