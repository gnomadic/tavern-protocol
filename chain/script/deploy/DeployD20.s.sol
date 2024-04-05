// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";

import {D20} from "../../src/tokens/D20.sol";

// # To deploy and verify the D20 NFT run this command below
// forge script script/deploy/DeployD20.s.sol:DeployD20 --rpc-url sepolia --broadcast --verify -vvvv
contract DeployD20 is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("MAINNET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        D20 d20 = new D20();

        vm.stopBroadcast();
    }
}
