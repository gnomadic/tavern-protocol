// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IComponent {
    function initialize(address game) external;
    function getSummary() external view returns (ComponentSummary memory);
}

struct ComponentSummary {
    address component;
    string metadata;
}
