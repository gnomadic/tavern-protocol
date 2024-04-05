// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract IModule {
// address GM;

// function setGM(address _gm) external {
//     GM = _gm;
// }

    function initialize() external virtual;

    function getSummary() external virtual view returns (ModuleSummary memory) ;
}

contract ModuleRoles is AccessControl {
// bytes32 public constant DM_ROLE = keccak256("DM_ROLE");

// constructor() {
//     _grantRole(DM_ROLE, msg.sender);
// }
}

struct ModuleSummary {
    address module;
    string[] functions;
    string[] required;
    string displayName;
}
