// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";

import {SensoTest} from "./SensoTest.t.sol";
import {Match} from "../../src/heroes/systems/CombatPVE.sol";
import {MonsterPrefab} from "../../src/heroes/systems/MonsterStats.sol";

contract FightAnEnemy is SensoTest {
    function prepareTest() public override {
        // vm.prank(address(2));
        // minting.mintHero{value: 0.05 ether}("TrainingDummy");
    }

    function test_create_pve_match() public {
        vm.prank(address(1));
        console.log("prank 1");
        minting.mintHero{value: 0.05 ether}(1);
        uint256 player1token = 0;

        vm.prank(address(1));
        pve.fightMonster(player1token);

        Match memory curMatch = pve.getMatch(player1token);

        assertEq(curMatch.player, address(1));
        assertEq(curMatch.monsterId, player1token);
        assertEq(curMatch.tokenId, player1token);
        assertEq(curMatch.active, true);

        vm.prank(address(2));
        minting.mintHero{value: 0.05 ether}(1);
        uint256 player2token = 1;

        vm.prank(address(2));
        pve.fightMonster(player2token);

        curMatch = pve.getMatch(player2token);

        assertEq(curMatch.player, address(2));
        assertEq(curMatch.monsterId, player2token);
        assertEq(curMatch.tokenId, player2token);
        assertEq(curMatch.active, true);
    }

    function test_create_pve_enemy() public {
        vm.prank(address(1));
        minting.mintHero{value: 0.05 ether}(1);
        uint256 player1token = 0;

        vm.prank(address(1));
        pve.fightMonster(player1token);

        Match memory curMatch = pve.getMatch(player1token);

        MonsterPrefab memory prefab = monsterStats.getPrefab(1);
        assertGt(prefab.numStatNames.length, 0);

        for (uint256 i = 0; i < prefab.numStatNames.length; i++) {
            assertEq(
                monsterStats.getNumStat(
                    curMatch.monsterId,
                    prefab.numStatNames[i]
                ),
                prefab.numStatValues[i]
            );
        }
    }

    function test_pve_first_action() public {
        vm.prank(address(1));
        minting.mintHero{value: 0.05 ether}(1);

        vm.prank(address(1));
        pve.fightMonster(0);

        uint256 startingPlayerHealth = stats.getNumStat(0, "health");
        uint256 startingPlayerDamage = stats.getNumStat(0, "damage");
        uint256 startingPlayerDefense = stats.getNumStat(0, "defense");

        uint256 startingEnemyHealth = monsterStats.getNumStat(0, "health");
        uint256 startingEnemyDamage = monsterStats.getNumStat(0, "damage");
        uint256 startingEnemyDefense = monsterStats.getNumStat(0, "defense");

        assertGt(startingPlayerHealth, 0);
        assertGt(startingEnemyHealth, 0);

        vm.prank(address(1));
        pve.performAction(0, 0);

        assertGt(startingPlayerHealth, stats.getNumStat(0, "health"));
        assertGt(startingEnemyHealth, monsterStats.getNumStat(0, "health"));

        //trianing dummy fight is one round
        Match memory curMatch = pve.getMatch(0);

        console.log("checking winner");
        assertEq(curMatch.winner, 1);
        console.log("checking active");
        assertEq(curMatch.active, false);
        uint256 playerXP = stats.getNumStat(0, "xp");
        uint256 enemyXP = monsterStats.getNumStat(0, "xp");
        console.log("playerXP: ", playerXP);
        assertEq(playerXP, enemyXP);
        assertGt(playerXP, 0);

        // console.log(monsterStats.getNumStat(0, "health"));

        // uint256[] memory tokens = hero.tokensOfOwner(address(1));
        // uint256[] memory tokens2 = hero.tokensOfOwner(address(2));
        // uint256 tokenId = tokens[0];
        // uint256 tokenId2 = tokens2[0];
        // uint256 health = stats.getNumStat(tokenId, "health");
        // uint256 health2 = stats.getNumStat(tokenId2, "health");
        // console.log("health: ", health);
        // console.log("health2: ", health2);
        // uint256 damage = 10;
        // uint256 damage2 = 5;
        // stats.setNumStat(tokenId, "attack", damage);
        // stats.setNumStat(tokenId2, "attack", damage2);
        // console.log("attack: ", stats.getNumStat(tokenId, "attack"));
        // console.log("attack2: ", stats.getNumStat(tokenId2, "attack"));
        // uint256 healthAfter = health - damage2;
        // uint256 healthAfter2 = health2 - damage;
        // console.log("healthAfter: ", healthAfter);
        // console.log("healthAfter2: ", healthAfter2);
        // combat.fight(tokenId, tokenId2);
        // uint256 newHealth = stats.getNumStat(tokenId, "health");
        // uint256 newHealth2 = stats.getNumStat(tokenId2, "health");
        // console.log("newHealth: ", newHealth);
        // console.log("newHealth2: ", newHealth2);
        // assertEq(newHealth, healthAfter);
        // assertEq(newHealth2, healthAfter2);
    }
}
