// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from "./interfaces/ISystem.sol";
import {IHeroStats} from "./interfaces/IHeroStats.sol";

import {console} from "forge-std/console.sol";

contract SimpleCombatResolver is ISystem {

    constructor(address reg) ISystem(reg) {}

    function heal(
        uint256 attacker,
        address attackStats,
        uint256 defender,
        address defenseStats
    ) external onlySystem {
        IHeroStats stats = IHeroStats(attackStats);
        uint256 healAmount = stats.getNumStat(attacker, "healAmount");
        stats.setNumStat(attacker, "health", healAmount);
        stats.setNumStat(attacker, "healAmount", 0);
    }

    function hit(
        uint256 attacker,
        address attackStats,
        uint256 defender,
        address defenseStats
    ) external onlySystem {
        // console.log("simplecombatresolver.hit");

        IHeroStats stats = IHeroStats(attackStats);
        IHeroStats defenderStats = IHeroStats(defenseStats);

        uint256 defenseHealth = defenderStats.getNumStat(defender, "health");
        uint256 attack = stats.getNumStat(attacker, "attack");
        uint256 defense = defenderStats.getNumStat(defender, "defense");

        //always deal 1 damage
        uint256 damage = 1;
        if (attack > defense) {
            damage = attack - defense;
        }

        if (damage > 0) {
            if (defenseHealth < damage) {
                damage = defenseHealth;
            }
            defenseHealth -= damage;
            defenderStats.setNumStat(defender, "health", defenseHealth);
        } else {
            // console.log("no damage");
        }

        // uint256 attack = stats.getNumStat(attacker, "attack");
        // uint256 defense = stats.getNumStat(defender, "defense");
        // uint256 health = stats.getNumStat(defender, "health");
        // uint256 damage = attack - defense;
        // if (damage > 0) {
        //     health -= damage;
        //     stats.setNumStat(defender, "health", health);
        // }
    }
}
