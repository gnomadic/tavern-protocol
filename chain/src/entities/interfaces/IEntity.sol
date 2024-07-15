// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IGame} from '../../interfaces/IGame.sol';

/// @title IEntity
/// @author gn0madic
/// @notice This is the base class for all Entities.  It defines the interface as well as some helper functions.
/// @dev Depending on the size and complexity of your entity, you might want another interface layer to minimize import bloat.
abstract contract IEntity is Initializable {
  string[] public keys;

  /// @notice Every deployed entity is associated with a deployed Game.
  address public game;

  /// @notice All data stored in an entity must be accessesible by a string Key
  /// @return Returns a string array containing every accessible key in the entity
  function getAvailableKeys() external view returns (string[] memory) {
    return keys;
  }

  function setAvailableKeys(string[] storage _keys) internal virtual;

  /// @notice Initialize the entity after it is created
  /// @dev Because getAvailableKeys returns an unbound array, might want to add keys to a global var here.
  /// @param _game the address of the Game contract which manages this entity
  function initialize(address _game) external virtual initializer {
    game = _game;
    setAvailableKeys(keys);
  }
  // TODO there are Game Scope and Player Scoped variables.  Do we want to treat them differently?

  /// @notice A helper function to check if the caller is a module of the game
  modifier onlyModule() {
    // TODO figure out permissions
    // if (!IGame(game).validateIsModule(msg.sender)) {
    //   revert('Module not supported');
    // }
    _;
  }

  modifier onlyModuleOrGame() {
    // TODO figure out permissions
    // if (!IGame(game).validateIsModule(msg.sender)) {
    //   revert('Module not supported');
    // }
    _;
  }
}
