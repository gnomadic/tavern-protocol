// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';
import {DailyInteractionEntity} from '../entities/DailyInteractionEntity.sol';
import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {IGame} from '../interfaces/IGame.sol';
import {GameFuncData} from '../interfaces/IGame.sol';

contract DailyInteractionModule is IModule, Initializable {
  // ok so this contract will
  // 1. basically be a stateless game?

  string public displayName = 'Daily Interaction';
  string[] public required = ['dailyAction', 'lastActionAt'];
  string[] public functions = ['dailyInteraction'];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {
    
  }
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

    function executeFunction(
    address game,
    string calldata func,
    GameFuncData calldata params
  ) external {
    if (
      keccak256(abi.encodePacked(func)) ==
      keccak256(abi.encodePacked('dailyInteraction'))
    ) {
      dailyInteraction(IGame(game), params);
    }
  }


function dailyInteraction(IGame game, GameFuncData calldata params) internal {

      uint256 tokenId;

          for (uint256 i = 0; i < params.uints.length; i++) {
      if (
        keccak256(abi.encodePacked(params.uints[i].name)) ==
        keccak256(abi.encodePacked('tokenId'))
      ) {
        tokenId = params.uints[i].value;
      }
    }

  // function dailyInteraction(IGame game, uint256 tokenId) public {
    uint256 lastActionAt = DailyInteractionEntity(game.getEntity('lastActionAt'))
      .getNumber(tokenId, 'lastActionAt');
    // uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
    if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
    uint256 dailyActions = DailyInteractionEntity(game.getEntity('dailyActions'))
      .getNumber(tokenId, 'dailyActions');

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
