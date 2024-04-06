// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";
import {BasicEntity} from "../src/BasicEntity.sol";
import {Game} from "../src/Game.sol";
import {MockNFT} from "./MockNFT.sol";

contract CounterTest is Test {
    MockNFT public nft;
    BasicEntity public entity;
    Game public game;

    function setUp() public {
        nft = new MockNFT();
        game = new Game();
        entity = new BasicEntity();
        entity.initialize(address(game), "test", address(nft));

        nft.mint(address(0xdeadbeef), 1);
    }

    function test_ownership() public {
        assertEq(nft.ownerOf(1), address(0xdeadbeef));
        vm.prank(address(0xdeadbeef));
        entity.assertOwnership(1, address(0xdeadbeef));

    }
}
