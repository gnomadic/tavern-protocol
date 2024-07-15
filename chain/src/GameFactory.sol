// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';
import {LibClone} from 'solady/utils/LibClone.sol';
import {IGame, GameSummary} from './interfaces/IGame.sol';
import {Game} from './Game.sol';
import {console} from 'forge-std/console.sol';


contract GameFactory {
  address public gameContract;
  Game[] public games;
  address public entityFactory;
  address public componentRegistry;

  address public admin;

  constructor(address _componentRegistry) {
    admin = msg.sender;
    componentRegistry = _componentRegistry;
  }

  function initialize(
    address _gameContract,
    address _entityFactory
  ) public onlyAdmin {
    gameContract = _gameContract;
    entityFactory = _entityFactory;
  }

  function setGameContract(address _gameContract) public onlyAdmin {
    gameContract = _gameContract;
  }

  function setEntityFactory(address _entityFactory) public onlyAdmin {
    entityFactory = _entityFactory;
  }

  function createGame(
    address _gm,
    string calldata metadata
  ) public returns (address) {
    address game = LibClone.clone(gameContract);
    IGame(game).initialize(address(this), componentRegistry, _gm, metadata, entityFactory);
    games.push(Game(game));

    emit GameCreated(game, _gm, metadata);

    return game;
  }

  function createGameWithComponents(
    address _gm,
    string calldata metadata,
    address[] calldata components
  ) public returns (address) {

    console.log("creating game with gm: %s, metadata: %s", _gm, metadata);
    IGame game = IGame(createGame(_gm, metadata));

    console.log("components length: %d", components.length);

    for (uint256 i = 0; i < components.length; i++) {
      game.addComponent(components[i]);
    }
    console.log("added");

    return address(game);
  }

  //returns an array of size 10 always, but some items will be empty when returning a page without 10 items.
  function getGames(
    uint8 startAt
  ) external view returns (GameSummary[10] memory result) {
    uint8 pageSize = 10;
    for (uint8 i = startAt; i < games.length && i < (pageSize + startAt); i++) {
      result[i] = games[i].getSummary();
    }
    return result;
  }

  function getGameCount() external view returns (uint256) {
    return games.length;
  }

  event GameCreated(address game, address gm, string metadata);

  error OnlyAdmin();

  modifier onlyAdmin() {
    if (msg.sender != admin) revert OnlyAdmin();
    _;
  }
}
