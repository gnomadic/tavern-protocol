// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {SystemRegistry} from "../../src/heroes/SystemRegistry.sol";
import {Hero} from "../../src/heroes/tokens/Hero.sol";
import {HeroRenderer} from "../../src/heroes/tokens/HeroRenderer.sol";
import {CombatActions} from "../../src/heroes/systems/CombatActions.sol";
import {CombatPVE} from "../../src/heroes/systems/CombatPVE.sol";
// import {HeroPrefabs} from "../src/systems/HeroPrefabs.sol";
import {HeroStats, Action} from "../../src/heroes/systems/HeroStats.sol";
import {Minting} from "../../src/heroes/systems/Minting.sol";
import {MonsterStats} from "../../src/heroes/systems/MonsterStats.sol";
import {SimpleCombatResolver} from "../../src/heroes/systems/SimpleCombatResolver.sol";

import {console} from "forge-std/console.sol";

abstract contract SensoTest is Test {
    SystemRegistry public registry;
    Minting public minting;
    Hero public hero;
    HeroStats public stats;
    // HeroPrefabs public prefabs;
    MonsterStats public monsterStats;
    // Combat public combat;
    CombatPVE public pve;
    SimpleCombatResolver public simpleResolver;
    CombatActions public combatActions;

    string[] prefabNumKeys;
    uint256[] prefabNums;
    string[] prefabStringKeys;
    string[] prefabStrings;
    uint256[] combatIndexes;

    address[] prefabLoaders;

    function deployTavern() public {
        // create a game
        vm.startPrank(address(0));

        // --- deploy tokens
        HeroRenderer renderer = new HeroRenderer();
        hero = new Hero(address(renderer));
        // --- end of deploy tokens

        // --- deploy systems
        registry = new SystemRegistry();
        stats = new HeroStats(address(registry));
        simpleResolver = new SimpleCombatResolver(address(registry));
        combatActions = new CombatActions(address(registry));
        monsterStats = new MonsterStats(
            address(registry),
            address(combatActions)
        );

        pve = new CombatPVE(
            address(registry),
            address(hero),
            address(monsterStats),
            address(stats),
            address(combatActions)
        );
        // prefabs = new HeroPrefabs(address(registry));

        minting = new Minting(
            address(registry),
            address(hero)
            // address(prefabs),
            // address(stats)
        );

        prefabLoaders.push(address(stats));
        prefabLoaders.push(address(combatActions));

        minting.addPrefabLoader(prefabLoaders);

        // registry.register(address(combat));
        registry.register(address(stats));
        registry.register(address(monsterStats));
        registry.register(address(simpleResolver));
        registry.register(address(pve));
        // registry.register(address(prefabs));
        registry.register(address(minting));

        // --- end of deploy systems

        // --- load prefabs
        //  uint256 id,
        //   string memory name,
        //   string[] memory _numStatNames,
        //   uint256[] memory _numStatValues,
        //   string[] memory _stringStatNames,
        //   string[] memory _stringStatValues

        // prefabNumKeys.push("attack");
        // prefabNums.push(10);
        // prefabNumKeys.push("defense");
        // prefabNums.push(5);
        // prefabNumKeys.push("speed");
        // prefabNums.push(3);
        // prefabNumKeys.push("health");
        // prefabNums.push(100);

        // prefabStringKeys.push("name");
        // prefabStrings.push("Warrior");

        // uint256 warriorId = 1;

        // stats.addPrefab(
        //     warriorId,
        //     "Warrior",
        //     prefabNumKeys,
        //     prefabNums,
        //     prefabStringKeys,
        //     prefabStrings
        // );

        uint256 warriorId = 1;

        createWarrior(warriorId);

        // --- load default combat actions
        // Action memory hit = Action(
        //     "hit",
        //     address(simpleResolver),
        //     "hit(uint256,address,uint256,address)",
        //     10
        // );
        // Action memory slam = Action(
        //     "slam",
        //     address(simpleResolver),
        //     "hit(uint256,address,uint256,address)",
        //     10
        // );

        // combatActions.registerCombatAction(1, hit);
        // combatActions.registerCombatAction(2, slam);
        // combatIndexes.push(1);
        // combatIndexes.push(2);

        // combatActions.addCombatPrefab(warriorId, combatIndexes);

        createCombatActions(warriorId);

        // stats.addCombatAction(id, action);

        delete prefabNumKeys;
        delete prefabNums;
        delete prefabStringKeys;
        delete prefabStrings;

        createEnemies();

        // prefabs.addPrefab(
        //     1,
        //     "TrainingDummy",
        //     prefabNumKeys,
        //     prefabNums,
        //     prefabStringKeys,
        //     prefabStrings
        // );

        // --- end of load prefabs

        // --- set minter
        hero.setMinter(address(minting));
        // --- end of set minter

        vm.stopPrank();

        prepareTest();
    }

    function setUp() public {
        console.log('calling setup?');
        deployTavern();
                console.log('done deploying setup?');

        vm.deal(address(1), 1 ether);
        vm.deal(address(2), 1 ether);
        vm.deal(address(3), 1 ether);
    }

    function prepareTest() public virtual;

    function createWarrior(uint256 warriorId) public {
        prefabNumKeys.push("attack");
        prefabNums.push(10);
        prefabNumKeys.push("defense");
        prefabNums.push(5);
        prefabNumKeys.push("speed");
        prefabNums.push(3);
        prefabNumKeys.push("health");
        prefabNums.push(100);
        prefabNumKeys.push("maxHealth");
        prefabNums.push(100);

        prefabStringKeys.push("name");
        prefabStrings.push("Warrior");

        stats.addPrefab(
            warriorId,
            "Warrior",
            prefabNumKeys,
            prefabNums,
            prefabStringKeys,
            prefabStrings
        );
    }

    string[] actionNumKeys;
    uint256[] actionNums;

    function createCombatActions(uint256 warriorId) public {
        delete actionNumKeys;
        delete actionNums;

        actionNumKeys.push("speed");
        actionNums.push(10);

        Action memory hit = Action(
            1,
            "hit",
            address(simpleResolver),
            "hit(uint256,address,uint256,address)",
            actionNumKeys,
            actionNums
        );

        delete actionNumKeys;
        delete actionNums;

        actionNumKeys.push("speed");
        actionNums.push(10);

        Action memory slam = Action(
            2,
            "slam",
            address(simpleResolver),
            "hit(uint256,address,uint256,address)",
            actionNumKeys,
            actionNums
        );

        combatActions.registerCombatAction(hit);
        combatActions.registerCombatAction(slam);
        combatIndexes.push(1);
        combatIndexes.push(2);

        combatActions.addCombatPrefab(warriorId, combatIndexes);
    }

    function createEnemies() public {
        prefabNumKeys.push("attack");
        prefabNums.push(1);
        prefabNumKeys.push("defense");
        prefabNums.push(1);
        prefabNumKeys.push("speed");
        prefabNums.push(1);
        prefabNumKeys.push("health");
        prefabNums.push(5);
        prefabNumKeys.push("maxHealth");
        prefabNums.push(5);
        prefabNumKeys.push("xp");
        prefabNums.push(1);

        delete actionNums;
        actionNums.push(1);

        prefabStringKeys.push("name");
        prefabStrings.push("Training Dummy");

        monsterStats.addMonster(
            1,
            prefabNumKeys,
            prefabNums,
            prefabStringKeys,
            prefabStrings,
            actionNums
        );
    }
}
