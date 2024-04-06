// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

interface IGame {
    function initialize(address _gm, string calldata displayName) external;

    function getSummary() external view returns (GameSummary memory);

        function addEntity(address entity) external ;

}

contract GameRoles is AccessControl {
    // bytes32 public constant DM_ROLE = keccak256("DM_ROLE");
    // bytes32 public constant PLAYER_ROLE = keccak256("PLAYER_ROLE");

    // constructor() {
    //     _grantRole(DM_ROLE, msg.sender);
    // }
}

  struct GameSummary {
        address game;
        address gm;
        string displayName;
        AddressKey[] availableFunctions;
        AddressKey[] availableData;
    }

    struct AddressKey {
        address Address;
        string Key;
    }