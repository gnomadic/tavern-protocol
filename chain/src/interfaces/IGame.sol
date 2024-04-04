// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

interface IGame {
    function gm() external view returns (address);
    function displayName() external view returns (string memory);

    function initialize(address _gm, string calldata displayName) external;
}

contract GameRoles is AccessControl {
    // bytes32 public constant DM_ROLE = keccak256("DM_ROLE");
    // bytes32 public constant PLAYER_ROLE = keccak256("PLAYER_ROLE");

    // constructor() {
    //     _grantRole(DM_ROLE, msg.sender);
    // }
}