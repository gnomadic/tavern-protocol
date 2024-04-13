// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IModule {
    function initialize(address game) external;
    function getSummary() external view returns (ModuleSummary memory);
    // function getProvidedFunctions() external view returns (string[] memory);
}

struct ModuleSummary {
    address module;
    string[] functions;
    string[] required; // TODO might want to make a distinction between depedencies and used or something
    string displayName;
}
