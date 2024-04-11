// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {HostedRolesEntity} from '../entities/HostedRolesEntity.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {HostedSessionEntity} from '../entities/HostedSessionEntity.sol';
import {HostedVoteEntity} from '../entities/HostedVoteEntity.sol';

import "forge-std/console.sol";

contract HostedVoteModule is IModule, Initializable {
  string public displayName = 'Multiplayer Hosted Voting';
   string[] public required = ['hostedVotes'];
  string[] public functions = [''];

  function initialize(address game) external override {
    address voteEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'HostedVoteEntity');

    IGame(game).addEntity(voteEntity);
  }
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function vote(IGame game, address host, address votee) external {
    HostedVoteEntity(game.getEntity('hostedVotes')).vote(
      host,
      msg.sender,
      votee
    );
  }



} 
