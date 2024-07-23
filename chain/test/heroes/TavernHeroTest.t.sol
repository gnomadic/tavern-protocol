// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {SystemRegistry} from '../../src/heroes/SystemRegistry.sol';
import {Hero} from '../../src/heroes/tokens/Hero.sol';
import {HeroRenderer} from '../../src/heroes/tokens/HeroRenderer.sol';
import {CombatActions} from '../../src/heroes/systems/CombatActions.sol';
import {CombatPVE} from '../../src/heroes/systems/CombatPVE.sol';
import {HeroStats, Action} from '../../src/heroes/systems/HeroStats.sol';
import {Minting} from '../../src/heroes/systems/Minting.sol';
import {MonsterStats} from '../../src/heroes/systems/MonsterStats.sol';
import {HeroStatResolver} from '../../src/heroes/systems/HeroStatResolver.sol';
import {HeroStatsGatcha} from '../../src/heroes/systems/HeroStatsGatcha.sol';
import {SimpleCombatResolver} from '../../src/heroes/systems/SimpleCombatResolver.sol';

import {console} from 'forge-std/console.sol';

abstract contract TavernHeroTest is Test {
  SystemRegistry public registry;
  Minting public minting;
  Hero public hero;
  HeroStats public stats;
  MonsterStats public monsterStats;
  CombatPVE public pve;
  SimpleCombatResolver public simpleResolver;
  CombatActions public combatActions;
  HeroStatResolver public heroStatResolver;
  HeroStatsGatcha public heroStatsGatcha;

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
    heroStatResolver = new HeroStatResolver(address(registry), address(stats));
    heroStatsGatcha = new HeroStatsGatcha(address(registry), address(stats));

    monsterStats = new MonsterStats(address(registry), address(combatActions));

    pve = new CombatPVE(
      address(registry),
      address(monsterStats),
      address(stats),
      address(combatActions)
    );
    minting = new Minting(address(registry));

    pve.setHero(address(hero));

    minting.setHero(address(hero));

    prefabLoaders.push(address(stats));
    prefabLoaders.push(address(combatActions));
    prefabLoaders.push(address(heroStatsGatcha));
    prefabLoaders.push(address(heroStatResolver));

    minting.addPrefabLoader(prefabLoaders);

    registry.register(address(stats));
    registry.register(address(monsterStats));
    registry.register(address(simpleResolver));
    registry.register(address(pve));
    registry.register(address(minting));
    registry.register(address(heroStatResolver));
    registry.register(address(heroStatsGatcha));

    // --- end of deploy systems

    // --- load prefabs

    createGatcha();
    createStatResolvers();

    uint256 warriorId = 1;

    createWarrior(warriorId);

    createCombatActions(warriorId);

    delete prefabNumKeys;
    delete prefabNums;
    delete prefabStringKeys;
    delete prefabStrings;

    createEnemies();

    // --- end of load prefabs

    // --- set minter
    hero.setMinter(address(minting));
    // --- end of set minter

    vm.stopPrank();

    prepareTest();
  }

  function setUp() public {
    deployTavern();

    vm.deal(address(1), 1 ether);
    vm.deal(address(2), 1 ether);
    vm.deal(address(3), 1 ether);
  }

  function prepareTest() public virtual;

  function createGatcha() public {
    string[] memory baseStats = new string[](6);
    baseStats[0] = 'authority';
    baseStats[1] = 'sustainability';
    baseStats[2] = 'resiliency';
    baseStats[3] = 'literacy';
    baseStats[4] = 'creativity';
    baseStats[5] = 'culture';

    heroStatsGatcha.setBaseStats(baseStats);

    uint8[] memory odds = new uint8[](5);
    odds[0] = 1;
    odds[1] = 5;
    odds[2] = 13;
    odds[3] = 25;
    odds[4] = 75;

    heroStatsGatcha.setRarityOdds(odds);

    uint8[] memory startingStats = new uint8[](5);
    startingStats[0] = 25;
    startingStats[1] = 20;
    startingStats[2] = 15;
    startingStats[3] = 10;
    startingStats[4] = 5;

    heroStatsGatcha.setStartingStats(startingStats);
  }

  function createStatResolvers() public {
    heroStatResolver.addResolver('authority', 'attack', 0, 200);
    heroStatResolver.addResolver('authority', 'defense', 0, 200);
    heroStatResolver.addResolver('authority', 'speed', 0, 200);
    heroStatResolver.addResolver('authority', 'health', 0, 200);
    heroStatResolver.addResolver('authority', 'maxHealth', 0, 200);
    heroStatResolver.addResolver('authority', 'critChance', 0, 200);
    heroStatResolver.addResolver('authority', 'critDamage', 0, 200);
  }

  function createWarrior(uint256 warriorId) public {
    prefabNumKeys.push('authority');
    prefabNums.push(5);
    prefabNumKeys.push('sustainability');
    prefabNums.push(5);
    prefabNumKeys.push('resiliency');
    prefabNums.push(5);
    prefabNumKeys.push('literacy');
    prefabNums.push(5);
    prefabNumKeys.push('creativity');
    prefabNums.push(5);
    prefabNumKeys.push('culture');
    prefabNums.push(5);

    prefabStringKeys.push('name');
    prefabStrings.push('Warrior');

    stats.addPrefab(
      warriorId,
      'Warrior',
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

    actionNumKeys.push('speed');
    actionNums.push(10);

    Action memory hit = Action(
      1,
      'hit',
      address(simpleResolver),
      'hit(uint256,address,uint256,address)',
      actionNumKeys,
      actionNums
    );

    delete actionNumKeys;
    delete actionNums;

    actionNumKeys.push('speed');
    actionNums.push(10);

    Action memory slam = Action(
      2,
      'slam',
      address(simpleResolver),
      'hit(uint256,address,uint256,address)',
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
    prefabNumKeys.push('attack');
    prefabNums.push(1);
    prefabNumKeys.push('defense');
    prefabNums.push(0);
    prefabNumKeys.push('speed');
    prefabNums.push(1);
    prefabNumKeys.push('health');
    prefabNums.push(1);
    prefabNumKeys.push('maxHealth');
    prefabNums.push(5);
    prefabNumKeys.push('xp');
    prefabNums.push(1);

    delete actionNums;
    actionNums.push(1);

    prefabStringKeys.push('name');
    prefabStrings.push('Training Dummy');

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
