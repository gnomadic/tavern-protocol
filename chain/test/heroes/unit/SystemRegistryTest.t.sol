// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {SystemRegistry} from "../../../src/heroes/SystemRegistry.sol";
import {HeroStats} from "../../../src/heroes/systems/HeroStats.sol";
import {CombatActions} from "../../../src/heroes//systems/CombatActions.sol";

contract SystemRegistryTest is Test {
    SystemRegistry public registry;
    HeroStats public stats;
    CombatActions public combatActions;

    function setUp() public {
        vm.prank(address(1));

        registry = new SystemRegistry();
        stats = new HeroStats(address(registry));
        combatActions = new CombatActions(address(registry));
    }

    function test_admin_permissions() public {
        vm.prank(address(2));
        vm.expectRevert();
        registry.register(address(stats));

        vm.prank(address(1));
        
        
        vm.expectEmit(address(registry));
        emit SystemRegistry.SystemRegistered(address(stats));
        registry.register(address(stats));

        vm.prank(address(2));
        vm.expectRevert();
        registry.unregister(address(stats));
    }

    function test_unregister() public {
        vm.prank(address(1));
        registry.register(address(stats));
        assertEq(registry.isRegistered(address(stats)), true);

        vm.expectEmit(address(registry));
        emit SystemRegistry.SystemUnregistered(address(stats));
        vm.prank(address(1));
        registry.unregister(address(stats));
        assertEq(registry.isRegistered(address(stats)), false);
    }
}
