// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from './interfaces/IEntity.sol';
import {IStringEntity} from './interfaces/IStringEntity.sol';
import {INumberEntity} from './interfaces/INumberEntity.sol';

contract HostedRolesEntity is IEntity {
  //global per game

  uint8 public roleCount;
  mapping(uint8 => RoleData) public roleData;
  // unique per session
  mapping(address => HostedRolesData) hostedRoles;

  string[] public keys;

  function initialize(address _game) public override {
    keys.push('roleData');
    keys.push('hostedRoles');
    keys.push('roleCount');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

  function setupRoles(
    string[] memory _roleNames
    // uint8[] memory max,
    // uint8[] memory min
  ) external {
    // TODO require all three arrays to be same size
    roleCount = uint8(_roleNames.length);
    for (uint8 i = 0; i < roleCount; i++) {
      roleData[i] = RoleData(_roleNames[i]);//, max[i], min[i]);
    }
  }

  function getRoleNames() external view returns (RoleData[] memory) {
    RoleData[] memory _roleNames = new RoleData[](roleCount);
    for (uint8 i = 0; i < roleCount; i++) {
      _roleNames[i] = roleData[i];
    }
    return _roleNames;
  }

  function setRole(address host, address _player, uint8 _role) external {
    hostedRoles[host].roles[_player] = _role;
    hostedRoles[host].players.push(_player);
  }

  function getRole(
    address host,
    address _player
  ) external view returns (uint8) {
    return hostedRoles[host].roles[_player];
  }

  function getPlayers(address host) external view returns (address[] memory) {
    return hostedRoles[host].players;
  }

  struct HostedRolesData {
    mapping(address => uint8) roles;
    address[] players;
  }

  struct RoleData {
    string roleName;
    // uint8 maxPlayersWithRole;
    // uint8 minPlayersWithRole;
  }
}
