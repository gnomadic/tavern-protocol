// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {HostedRolesEntity} from '../entities/HostedRolesEntity.sol';
import {HostedPhasesEntity} from '../entities/HostedPhasesEntity.sol';

contract RoleManipulationModule is IModule, Initializable {

  string public displayName = 'Multiplayer Hosted Roles';
  string[] public required = ['dailyAction', 'lastActionAt'];
  string[] public functions = ['dailyInteraction'];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {}
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function manipulate(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external returns (uint8) {
    uint8 playerRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, msg.sender);
    uint8 phase = HostedPhasesEntity(game.getEntity('phaseData')).getPhase(host);

    if (playerRole != phase) revert NotTurn();

    //based on the role/phase, we want to call the appropriate function.
    // this should be based on something in the entity
    string memory func = HostedRolesEntity(game.getEntity('roleData')).getRoleFunction(playerRole);
    (bool success, ) = address(this).delegatecall(abi.encodeWithSignature(func, game, host, target, secondTarget));
    if (!success) revert RoleFunctionDoesNotExist();
  }

  error NotTurn();
  error RoleFunctionDoesNotExist();

  //have a function for every action that can be taken 
  // doppleganger clones a role and wins if they win
  function cloneRole(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external {
    uint8 targetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, target);
    HostedRolesEntity(game.getEntity('roleData')).setRole(host, msg.sender, targetRole);
  }


  // werewolfs know who eachother are and win if they don't get caught
  // minion knows who the werewolfs are and wins when they do
  function broadcastRole(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external {
    uint8 targetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, target);
    // hmmmmmmmm how do we send information to specific users
  }

  // the seer can look at another players cards or 2 in the center
  function viewCards(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external {
    uint8 targetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, target);
        // hmmmmmmmm how do we send information to specific users

  }

    // robber can swap cards with another player
    function swapMyCard(
      IGame game, 
      address host,
      address target,
      address secondTarget
    ) external {
      uint8 targetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, target);
      uint8 myRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, msg.sender);
      HostedRolesEntity(game.getEntity('roleData')).setRole(host, target, myRole);
      HostedRolesEntity(game.getEntity('roleData')).setRole(host, msg.sender, targetRole);
    }



      // troublemaker can swap two other players cards
  function swapCards(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external {
    uint8 targetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, target);
    uint8 secondTargetRole = HostedRolesEntity(game.getEntity('roleData')).getRole(host, secondTarget);
    HostedRolesEntity(game.getEntity('roleData')).setRole(host, target, secondTargetRole);
    HostedRolesEntity(game.getEntity('roleData')).setRole(host, secondTarget, targetRole);
  }

  //villager does nothing
  function doNothing(
    IGame game,
    address host,
    address target,
    address secondTarget
  ) external {
    // do nothing
  }




  // there are two masons always and they know who eachother are - if theyr'e alone, a mason is in the pool
  // drunk swaps their card with a card in the center
  // insomniac looks at their card at the end of the night
  // villager does nothing
  // tanner wins if they die
  // hunter gets to point at someone when they die and that person dies too
}
