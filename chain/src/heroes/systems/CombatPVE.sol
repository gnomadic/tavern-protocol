// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Action, ISystem} from "./interfaces/ISystem.sol";
import {IHeroStats} from "./interfaces/IHeroStats.sol";
import {IPrefabLoader} from "./interfaces/IPrefabLoader.sol";
import {ICombatActions} from "./interfaces/ICombatActions.sol";

import {console} from "forge-std/console.sol";

struct Match {
    address player;
    uint256 tokenId;
    uint256 monsterId;
    bool active;
    uint256 winner; // 1 is player 2 is monster
}

contract CombatPVE is ISystem {
    IHeroStats private stats;
    IHeroStats private monsters;
    BalanceChecker private hero;
    ICombatActions private combatActions;

    mapping(uint256 => Match) private matches;

    constructor(
        address reg,
        address _hero,
        address _monster,
        address _stats,
        address _combatActions
    ) ISystem(reg) {
        hero = BalanceChecker(_hero);
        stats = IHeroStats(_stats);
        monsters = IHeroStats(_monster);
        combatActions = ICombatActions(_combatActions);
    }

    function fightMonster(uint256 tokenId) external {
        if (hero.ownerOf(tokenId) != msg.sender) revert MustHold();
        if (matches[tokenId].active) revert AlreadyInMatch();

        // TODO get monster
        uint256 monsterPrefabId = 1;

        IPrefabLoader(address(monsters)).loadFromPrefab(
            tokenId,
            monsterPrefabId
        );

        matches[tokenId] = Match({
            player: msg.sender,
            monsterId: tokenId,
            tokenId: tokenId,
            active: true,
            winner: 0
        });
    }

    function performAction(uint256 tokenId, uint8 actionIndex) external {
        Match storage curMatch = matches[tokenId];

        if (hero.ownerOf(tokenId) != msg.sender) revert MustHold();
        if (curMatch.player != msg.sender) revert MustHold();
        if (!curMatch.active) revert MustFindMatch();

        Action[] memory actions = combatActions.getCombatActions(tokenId);

        if (actionIndex >= actions.length) revert InvalidAction();
        Action memory action = actions[actionIndex];

        Action[] memory monsterActions = ICombatActions(address(monsters))
            .getCombatActions(curMatch.monsterId);
        // TODO choose index more intelligently
        uint256 monsterActionIndex = 0;
        Action memory monsterAction = monsterActions[monsterActionIndex];

        uint256 actionSpeed = combatActions.getCombatActionNumStat(
            action.id,
            "speed"
        );

        uint256 playerSpeed = actionSpeed + stats.getNumStat(tokenId, "speed");
        uint256 monsterSpeed = combatActions.getCombatActionNumStat(
            monsterAction.id,
            "speed"
        ) + monsters.getNumStat(curMatch.tokenId, "speed");

        if (playerSpeed > monsterSpeed) {
            console.log("player going first");
            callCombatAction(
                action,
                tokenId,
                address(stats),
                curMatch.monsterId,
                address(monsters)
            );
            callCombatAction(
                monsterAction,
                curMatch.monsterId,
                address(monsters),
                tokenId,
                address(stats)
            );
        } else {
            callCombatAction(
                monsterAction,
                curMatch.monsterId,
                address(monsters),
                tokenId,
                address(stats)
            );
            callCombatAction(
                action,
                tokenId,
                address(stats),
                curMatch.monsterId,
                address(monsters)
            );
        }
        checkResults(curMatch);
    }

    function callCombatAction(
        Action memory action,
        uint256 attacker,
        address attackStats,
        uint256 defender,
        address defenseStats
    ) internal {
        (bool success, ) = action.to.call(
            abi.encodeWithSignature(
                action.func,
                attacker,
                address(attackStats),
                defender,
                address(defenseStats)
            )
        );
        if (!success) {
            revert ActionFailed();
        }
    }

    function checkResults(Match storage curMatch) internal {
        uint256 playerHealth = stats.getNumStat(curMatch.tokenId, "health");
        uint256 monsterHealth = monsters.getNumStat(
            curMatch.monsterId,
            "health"
        );

        if (playerHealth <= 0) {
            curMatch.winner = 2;
            curMatch.active = false;
            // TODO set bounty?
        } else if (monsterHealth <= 0) {
            curMatch.winner = 1;
            curMatch.active = false;
            uint256 monsterXP = monsters.getNumStat(curMatch.monsterId, "xp");
            uint256 curXp = stats.getNumStat(curMatch.tokenId, "xp");
            stats.setNumStat(curMatch.tokenId, "xp", curXp + monsterXP);
        }
    }

    function getMatch(uint256 tokenId) external view returns (Match memory) {
        return matches[tokenId];
    }

    error MustHold();
    error MustFindMatch();
    error InvalidAction();
    error AlreadyInMatch();
    error ActionFailed();
}

interface BalanceChecker {
    function ownerOf(uint256 tokenId) external view returns (address);
}
