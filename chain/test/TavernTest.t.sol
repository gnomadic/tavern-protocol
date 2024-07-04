// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {IGame, FlowParams} from '../src/interfaces/IGame.sol';
import {Game} from '../src/Game.sol';
import {EntityFactory} from '../src/EntityFactory.sol';
import {ComponentRegistry} from '../src/ComponentRegistry.sol';
import {InputValidation} from '../src/components/InputValidation.sol';
import {InputValidationEntity} from '../src/entities/InputValidationEntity.sol';

abstract contract TavernTest is Test {
  GameFactory public factory;
  Game public liveGame;
  ComponentRegistry public registry;
  EntityFactory public entityFactory;

  function deployTavern() public {
    // create a game
    vm.startPrank(address(0));

    Game game = new Game();
    entityFactory = new EntityFactory();
    registry = new ComponentRegistry();

    factory = new GameFactory(address(registry));
    factory.initialize(address(game), address(entityFactory));



    InputValidationEntity inputEntity = new InputValidationEntity();
    entityFactory.registerEntity('InputValidationEntity', address(inputEntity));

        InputValidation input = new InputValidation(
      'http://ipfs.io/ipfs/QmZCJy4hetvHPqnqVVHobnJgsWy6ARpGgHTFLw77oMJpT5/template.json'
    );
    registry.register(address(input));

    registry.registerRequired(address(input), 'validateInput(address,address)');

    factory.createGame(
      address(0),
      'http://ipfs.io/ipfs/QmUXhiGQsawmyaAJ1zdiGEANbW3WAVSdJYrqosX6RTvgLC/template.json'
    );
    liveGame = factory.games(0);

    loadModules();

    createFunctions();

    vm.stopPrank();
  }

  function loadModules() public virtual;

  function createFunctions() public virtual;

  function clearParams(FlowParams memory toClear) public {
    delete toClear.addresses;
    delete toClear.strings;
    delete toClear.uints;
  }
}
