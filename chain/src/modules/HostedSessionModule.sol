// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from '../entities/interfaces/IEntity.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {HostedSessionEntity} from '../entities/HostedSessionEntity.sol';
import 'forge-std/console.sol';

contract HostedSessionModule is IModule, Initializable {
  string public displayName = 'Multiplayer Hosted Sessions';
  string[] public required = ['maxSessionSize', 'hostedSessions'];
  string[] public functions = [
    'createSession',
    'joinSession',
    'getSessionPlayers'
  ];

  function initialize(address game) external override {
    address sessionEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'HostedSessionEntity');

    IGame(game).addEntity(sessionEntity);
  }

  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function setGameConfig(IGame game, uint8 maxGameSize) public {
    HostedSessionEntity(game.getEntity('maxSessionSize')).setMaxSessionSize(
      maxGameSize
    );
  }

  function createSession(IGame game) external {
    HostedSessionEntity(game.getEntity('hostedSessions')).createSession(
      msg.sender
    );
  }

  function joinSession(IGame game, address host) external {
    HostedSessionEntity(game.getEntity('hostedSessions')).joinSession(
      host,
      msg.sender
    );
  }

  function getSessionPlayers(
    IGame game,
    address host
  ) external view returns (address[] memory) {
    return
      HostedSessionEntity(game.getEntity('hostedSessions'))
        .getSession(host)
        .players;
  }
}
