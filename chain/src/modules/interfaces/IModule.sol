// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {GameFuncData} from '../../interfaces/IGame.sol';

interface IModule {
    function initialize(address game) external;
    function getSummary() external view returns (ModuleSummary memory);
    function executeFunction(address game, string calldata func, GameFuncData memory params) external;
    // function getProvidedFunctions() external view returns (string[] memory);

          // IModule(funcs[i].Address).executeFunction(funcs[i].Key, params);

}

struct ModuleSummary {
    address module;
    string[] functions;
    string[] required; // TODO might want to make a distinction between depedencies and used or something
    string displayName;
}
