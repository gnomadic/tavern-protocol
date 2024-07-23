// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IComponentRegistry} from "./interfaces/IComponentRegistry.sol";

contract SystemRegistry is IComponentRegistry {
    address public admin;

    mapping(address => bool) public activeSystems;

    constructor() {
        admin = msg.sender;
    }

    function register(address system) public {
        if (msg.sender != admin) {
            revert NotAuthorized();
        }
        activeSystems[system] = true;

        emit SystemRegistered(system);
    }

    function bulkRegister(address[] memory systems) public {
        if (msg.sender != admin) {
            revert NotAuthorized();
        }
        for (uint256 i = 0; i < systems.length; i++) {
            activeSystems[systems[i]] = true;
            emit SystemRegistered(systems[i]);
        }
    }

    function unregister(address system) public {
        if (msg.sender != admin) {
            revert NotAuthorized();
        }
        activeSystems[system] = false;

        emit SystemUnregistered(system);
    }

    function isRegistered(address system) external view returns (bool) {
        return activeSystems[system];
    }

    event SystemRegistered(address system);
    event SystemUnregistered(address system);
    error NotAuthorized();
}
