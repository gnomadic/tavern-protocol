// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";

import {D7} from "../../src/tokens/D7.sol";

// # To deploy and verify the Dice NFT run this command below
// forge script script/deploy/DeployDice.s.sol:DeployDice --rpc-url sepolia --broadcast --verify -vvvv
contract DeployDice is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("MAINNET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        D7 d7 = new D7();

        vm.stopBroadcast();
    }
}
