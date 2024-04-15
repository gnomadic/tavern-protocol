// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {HostedRolesEntity} from '../entities/HostedRolesEntity.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {HostedSessionEntity} from '../entities/HostedSessionEntity.sol';
import {HostedPhasesEntity} from '../entities/HostedPhasesEntity.sol';
import "forge-std/console.sol";

contract HostedPhasesModule is IModule, Initializable {
  string public displayName = 'Multiplayer Hosted Phases';
   string[] public required = ['phaseData', 'hostedPhases', 'phasesCount'];
  string[] public functions = [''];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {
    address phaseEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'HostedPhasesEntity');
      // console.log('created phase entity %s', phaseEntity);

    IGame(game).addEntity(phaseEntity);
  }
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function setGameConfig(
    IGame game,
    string[] memory names
  ) public {
    // console.log('setting up phases');
    HostedPhasesEntity(game.getEntity('phaseData')).setupPhases(
      names
    );
  }

  function nextPhase(IGame game, address host) external {
    HostedPhasesEntity(game.getEntity('phaseData')).nextPhase(host);
  }

  function getPhase(IGame game, address host) external view returns (uint8) {
    return HostedPhasesEntity(game.getEntity('phaseData')).getPhase(host);
  }

  function setPhase(IGame game, address host, uint8 phase) external {
    HostedPhasesEntity(game.getEntity('phaseData')).setPhase(host, phase);
  }





  function getRole(IGame game, address host, address player) external view returns (uint8) {
    return HostedRolesEntity(game.getEntity('hostedRoles')).getRole(host, player);
  }

  error NotEnoughTimePassed();
}
