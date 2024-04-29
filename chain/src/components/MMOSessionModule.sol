// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {GameFuncParams, GameFuncUint} from '../interfaces/IGame.sol';
import {GameEntity} from '../entities/GameEntity.sol';

import {console} from 'forge-std/console.sol';

contract MMOSessionModule is IComponent {
  string[] public required = ['players'];
  string[] public functions = ['joinGame'];
  string[] public abis = ['joinGame(address,address)'];

  function initialize(address game) external {
    IGame(game).createEntity('MMOSessionEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return ComponentSummary(address(this), functions, abis, required, 'MMO Session');
  }

  // function executeFunction(
  //   address executor,
  //   address game,
  //   string calldata func,
  //   GameFuncParams calldata params
  // ) external {
  //   if (
  //     keccak256(abi.encodePacked(func)) ==
  //     keccak256(abi.encodePacked('joinGame'))
  //   ) {
  //     // joinGame(executor, IGame(game));
  //     (bool success, ) = address(this).call(
  //       abi.encodeWithSignature(
  //         'joinGame(address,address)',
  //         executor,
  //         game
  //       )
  //     );
  //     console.log('success', success);
  //   }
  // }

  function joinGame(address executor, address gameAddress) public {
    address player;
    console.log('joining game');
    IGame game = IGame(gameAddress);
    // for (uint256 i = 0; i < params.addresses.length; i++) {
    //   if (
    //     keccak256(abi.encodePacked(params.addresses[i].name)) ==
    //     keccak256(abi.encodePacked('player'))
    //   ) {
    //     player = params.addresses[i].value;
    //   }
    // }
    // TODO this is a bad example because for the player address we should use the executor to prevent
    // players from playing on someone elses behalf, sorry relays.
    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');
    // console.log('test', test);

    MMOSessionEntity(game.getEntity('players')).addPlayer(player);
  }

  function getPlayerCount(IGame game) external view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }
}
