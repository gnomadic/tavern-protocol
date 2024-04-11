// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {HostedRolesEntity} from '../entities/HostedRolesEntity.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {HostedSessionEntity} from '../entities/HostedSessionEntity.sol';
import "forge-std/console.sol";

contract HostedRolesModule is IModule, Initializable {
  string public displayName = 'Multiplayer Hosted Roles';
   string[] public required = ['roleData', 'hostedRoles', 'hostedSessions'];
  string[] public functions = [''];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {
    address roleEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'HostedRolesEntity');

    IGame(game).addEntity(roleEntity);
  }
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function setGameConfig(
    IGame game,
    string[] memory names
  ) public {
    HostedRolesEntity(game.getEntity('roleData')).setupRoles(
      names
    );
  }

  // once all players have joined, the host calls this to start the game
  function assignRoles(IGame game, address host) external {
    // TODO this requires role count and session size to be the same.
    uint256 sessionSize = HostedSessionEntity(game.getEntity('hostedSessions')).getSession(host).players.length;
    uint8 roleCount = HostedRolesEntity(game.getEntity('hostedRoles')).roleCount();
    uint8[] memory availableRoles = new uint8[](sessionSize);

    for (uint8 i = 0; i < roleCount; i++) {
      availableRoles[i] = i;
    }

    // shuffle the roles
    availableRoles = shuffle(availableRoles);

    for (uint256 i = 0; i < sessionSize; i++) {
      HostedRolesEntity(game.getEntity('hostedRoles')).setRole(
        host,
        HostedSessionEntity(game.getEntity('hostedSessions')).getSession(host).players[i],
        availableRoles[i]
      );
    }


 


  }

  // function getRandom(uint8 max) public view returns (uint8) {
  //   return uint8(uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % max);
  // }

function shuffle(uint8[] memory roleArray) public  returns (uint8[] memory){
    for (uint256 i = 0; i < roleArray.length; i++) {
        uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (roleArray.length - i);
        uint256 temp = roleArray[n];
        roleArray[n] = roleArray[i];
        roleArray[i] = (uint8)(temp);
    }
    return roleArray;
}


  function getRole(IGame game, address host) external view returns (uint8) {
    return HostedRolesEntity(game.getEntity('hostedRoles')).getRole(host, msg.sender);
  }

  error NotEnoughTimePassed();
}
