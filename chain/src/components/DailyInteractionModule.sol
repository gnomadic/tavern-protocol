// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';
import {DailyInteractionEntity} from '../entities/DailyInteractionEntity.sol';
import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {GameFuncParams} from '../interfaces/IGame.sol';
import {GameEntity} from '../entities/GameEntity.sol';

contract DailyInteractionModule is IComponent, Initializable {
  // ok so this contract will
  // 1. basically be a stateless game?

  string public displayName = 'Daily Interaction';
  string[] public required = ['dailyAction', 'lastActionAt'];
  string[] public functions = ['dailyInteraction'];
  string[] public abis = ['dailyInteraction(address,address)'];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {}
  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return
      ComponentSummary(address(this), functions, abis, required, displayName);
  }

  // function executeFunction(
  //   address executor,
  //   address game,
  //   string calldata func,
  //   GameFuncParams calldata params
  // ) external {
  //   if (
  //     keccak256(abi.encodePacked(func)) ==
  //     keccak256(abi.encodePacked('dailyInteraction'))
  //   ) {
  //   //   dailyInteraction(IGame(game), params);
  //      (bool success, ) = address(this).call(
  //       abi.encodeWithSignature(
  //         'dailyInteraction(address,address)',
  //         executor,
  //         game
  //       )
  //     );
  //   }
  // }

  function dailyInteraction(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);

    uint256 tokenId;

    //       for (uint256 i = 0; i < params.uints.length; i++) {
    //   if (
    //     keccak256(abi.encodePacked(params.uints[i].name)) ==
    //     keccak256(abi.encodePacked('tokenId'))
    //   ) {
    //     tokenId = params.uints[i].value;
    //   }
    // }

    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    tokenId = gameEntity.getPlayerUint(executor, 'tokenId');

    // function dailyInteraction(IGame game, uint256 tokenId) public {
    uint256 lastActionAt = DailyInteractionEntity(
      game.getEntity('lastActionAt')
    ).getNumber(tokenId, 'lastActionAt');
    // uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
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

  // function getProvidedFunctions() external view returns (string[] memory){
  //     return functions;
  // }

  error NotEnoughTimePassed();
}
