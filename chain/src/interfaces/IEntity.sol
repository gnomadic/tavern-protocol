// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract EntityRoles is AccessControl {
    // bytes32 public constant DM_ROLE = keccak256("DM_ROLE");
    // bytes32 public constant MODULE_ROLE = keccak256("MODULE_ROLE");

    // constructor() {
    //     _grantRole(DM_ROLE, msg.sender);
    // }
}

abstract contract IEntity is EntityRoles {
    // function getString(uint256 tokenId, string memory key) external view virtual returns (string memory);
    // function setString(uint256 tokenId, string memory key, string memory value) external virtual;

    // function getNumber(uint256 tokenId, string calldata key) external virtual view returns (uint256);
    // function setNumber(uint256 tokenId, string calldata key, uint256 value) external virtual;
}

