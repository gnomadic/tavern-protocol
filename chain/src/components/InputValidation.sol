// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';

import {InputValidationEntity} from '../entities/InputValidationEntity.sol';
import {FlowEntity} from '../entities/FlowEntity.sol';
import {console} from 'forge-std/console.sol';

contract InputValidation is IComponent {
  constructor(string memory _metadata) IComponent(_metadata) {}

  function initialize(address game) external override {
    IGame(game).createEntity('InputValidationEntity');
  }

  function getSummary()
    external
    view
    override
    returns (ComponentSummary memory)
  {
    return ComponentSummary(address(this), metadata);
  }

  function addValidInput(
    address game,
    string memory validKey
  ) external onlyGM(game) {
    InputValidationEntity(IGame(game).getEntity('inputValidation')).addValidKeys(
      validKey
    );
  }

  function getValidKeys(address game)
    external
    view
    returns (string[] memory)
  {
    return InputValidationEntity(IGame(game).getEntity('inputValidation')).getValidKeys();
  }



  function validateInput(
    address executor,
    address gameAddress
  ) public onlyGame(gameAddress) {

    console.log("validating input");
    IGame game = IGame(gameAddress);
    FlowEntity gameEntity = FlowEntity(game.getEntity('playerParams'));

    InputValidationEntity inputValidation = InputValidationEntity(
      game.getEntity('inputValidation')
    );

    string[] memory inputKeys = gameEntity.getPlayerStringArray(executor, "allInputKeys");
    console.log("InputValidation.validateInput",address(inputValidation));
    

    bool isValid = inputValidation.validate(inputKeys);
    
    if (!isValid) {
      gameEntity.setFailure('Player provided invalid parameters');
    }
  }
}
