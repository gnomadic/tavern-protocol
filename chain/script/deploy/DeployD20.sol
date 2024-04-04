// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";

import {GameFactory} from "../../src/GameFactory.sol";
import {Game} from "../../src/Game.sol";
import {ModuleRegistry} from "../../src/ModuleRegistry.sol";
import {DailyInteractionModule} from "../../src/modules/DailyInteractionModule.sol";

// # To deploy and verify the PLAYMINT protocol run this command below
// forge script script/deploy/DeployProtocol.s.sol:DeployProtocol --rpc-url sepolia --broadcast --verify -vvvv
contract DeployProtocol is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("MAINNET_PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Game game = new Game();

        GameFactory factory = new GameFactory();
        factory.initialize(address(game));

        ModuleRegistry registry = new ModuleRegistry();

        DailyInteractionModule dailyInteraction = new DailyInteractionModule();

        registry.register(address(dailyInteraction));

        vm.stopBroadcast();
    }
}
