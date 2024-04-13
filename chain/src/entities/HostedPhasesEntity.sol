// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../interfaces/IGame.sol';
import {IEntity} from './interfaces/IEntity.sol';
import {IStringEntity} from './interfaces/IStringEntity.sol';
import {INumberEntity} from './interfaces/INumberEntity.sol';

import "forge-std/console.sol";

contract HostedPhasesEntity is IEntity {
  //global per game

  uint8 public phasesCount;
  mapping(uint8 => PhaseData) public phaseData;
  // unique per session
  mapping(address => uint8) hostedPhases;

  string[] public keys;

  function initialize(address _game) public override {
    console.log('initializing HostedPhasesEntity');
    keys.push('phaseData');
    keys.push('hostedPhases');
    keys.push('phasesCount');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

  function setupPhases(
    string[] memory _phaseNames
  ) external 
  {
          console.log('okkk');

    // TODO require all three arrays to be same size
    phasesCount = uint8(_phaseNames.length);
    for (uint8 i = 0; i < phasesCount; i++) {
      console.log('setting up phase"%s', _phaseNames[i]);
      phaseData[i] = PhaseData(_phaseNames[i]); //, max[i], min[i]);
    }
  }

  function getPhaseNames() external view returns (PhaseData[] memory) {
    PhaseData[] memory _phaseNames = new PhaseData[](phasesCount);
    for (uint8 i = 0; i < phasesCount; i++) {
      _phaseNames[i] = phaseData[i];
    }
    return _phaseNames;
  }

  function setPhase(address host, uint8 phase) external {
    hostedPhases[host] = phase;
  }

  function nextPhase(address host) external {
    hostedPhases[host] = hostedPhases[host] + 1;
  }

  function getPhase(address host) external view returns (uint8) {
    return hostedPhases[host];
  }

  struct PhaseData {
    string phaseName;
  }
}
