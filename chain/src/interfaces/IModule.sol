// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IModule {
    function initialize() external;
    function getSummary() external view returns (ModuleSummary memory);
    function getProvidedFunctions() external view returns (string[] memory);
}

struct ModuleSummary {
    address module;
    string[] functions;
    string[] required;
    string displayName;
}
