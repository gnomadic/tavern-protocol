// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';
import {DailyInteractionEntity} from '../entities/DailyInteractionEntity.sol';
import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';

contract DailyInteractionModule is IComponent, Initializable {
  
  string public metadata;

  constructor(string memory _metadata) {
    metadata = _metadata;
  }

  function initialize(address game) external override {}

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return
      ComponentSummary(
        address(this),
        metadata
      );
  }

  function dailyInteraction(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);

    uint256 tokenId;

    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));
    tokenId = gameEntity.getPlayerUint(executor, 'tokenId');

    uint256 lastActionAt = DailyInteractionEntity(
      game.getEntity('lastActionAt')
    ).getNumber(tokenId, 'lastActionAt');

    if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
    uint256 dailyActions = DailyInteractionEntity(
      game.getEntity('dailyActions')
    ).getNumber(tokenId, 'dailyActions');

    DailyInteractionEntity(game.getEntity('dailyActions')).updateNumber(
      tokenId,
      'dailyActions',
      dailyActions + 1
    );

    DailyInteractionEntity(game.getEntity('lastActionAt')).updateNumber(
      tokenId,
      'lastActionAt',
      block.timestamp
    );
  }

  error NotEnoughTimePassed();
}
