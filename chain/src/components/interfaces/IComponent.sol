// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {GameFuncParams} from '../../interfaces/IGame.sol';

interface IComponent {
    function initialize(address game) external;
    function getSummary() external view returns (ComponentSummary memory);
    function executeFunction(address game, string calldata func, GameFuncParams memory params) external;
}

struct ComponentSummary {
    address component;
    string[] functions;
    string[] required; // TODO might want to make a distinction between depedencies and used or something
    string displayName;
}
