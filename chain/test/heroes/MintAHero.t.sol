// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';

import {TavernHeroTest} from './TavernHeroTest.t.sol';
import {HeroPrefab, Action} from '../../src/heroes/systems/HeroStats.sol';
import {CombatPrefab} from '../../src/heroes/systems/CombatActions.sol';
import {Resolver} from '../../src/heroes/systems/HeroStatResolver.sol';


contract MintAHero is TavernHeroTest {
  function prepareTest() public override {}

  function test_mint() public {
    uint256 balance = hero.balanceOf(address(1));
    assertEq(balance, 0);

    vm.prank(address(1));
    minting.mintHero{value: 0.05 ether}(1);

    balance = hero.balanceOf(address(1));
    assertEq(balance, 1);
  }

  function test_mint_stats_from_prefab() public {
    uint256 prefabId = 1;

    vm.prank(address(1));
    minting.mintHero{value: 0.05 ether}(prefabId);

    HeroPrefab memory prefab = stats.getPrefab(prefabId);

    string[] memory prefabNumStatNames = prefab.numStatNames;
    string[] memory prefabStringStatNames = prefab.stringStatNames;

    uint256[] memory tokenIds = hero.tokensOfOwner(address(1));

    for (uint256 i = 0; i < prefabNumStatNames.length; i++) {
      uint256 prefabStat = prefab.numStatValues[i];
      uint256 tokenStat = stats.getNumStat(tokenIds[0], prefabNumStatNames[i]);
      assertGe(tokenStat, prefabStat);
    }

    for (uint256 i = 0; i < prefabStringStatNames.length; i++) {
      string memory prefabStat = prefab.stringStatValues[i];
      string memory tokenStat = stats.getStringStat(
        tokenIds[0],
        prefabStringStatNames[i]
      );
      assertEq(tokenStat, prefabStat);
    }

    // uint256[] memory combatActions = prefabs.getCombatActions(prefabId);
    // assertGt(combatActions.length, 0);
    // for (uint256 i = 0; i < combatActions.length; i++) {
    //     assertEq(i + 1, combatActions[i]);
    // }
  }

  function test_mint_combat_actions() public {
    uint256 prefabId = 1;

    vm.prank(address(1));
    minting.mintHero{value: 0.05 ether}(prefabId);

    Action[] memory actions = combatActions.getCombatActions(0);
    assertGt(actions.length, 0);

    CombatPrefab memory prefab = combatActions.getCombatPrefab(prefabId);

    assertEq(prefab.combatActions.length, actions.length);

    // for (uint256 i = 0; i < actions.length; i++) {
    //     Action memory action = actions[i];
    //     assertEq(action.id, right);
    //     Action memory prefabAction = combatActionRepo[prefab.combatActions[i]][0];
    //     assertEq(action.id, prefabAction.id);
    //     assertEq(action.name, prefabAction.name);
    //     assertEq(action.damage, prefabAction.damage);
    //     assertEq(action.cooldown, prefabAction.cooldown);
    // }
  }



  function test_mint_gatcha() public {
    uint256 prefabId = 1;

    vm.prank(address(1));
    minting.mintHero{value: 0.05 ether}(prefabId);

    string[] memory baseStats = heroStatsGatcha.getBaseStats();
    uint256[] memory tokenIds = hero.tokensOfOwner(address(1));

    uint256 gatchaSum = 0;
    uint256 prefabSum = 0;

    HeroPrefab memory prefab = stats.getPrefab(prefabId);
    string[] memory prefabNumStatNames = prefab.numStatNames;
    for (uint256 i = 0; i < prefabNumStatNames.length; i++) {
      for (uint256 j = 0; j < baseStats.length; j++) {
        if (
          keccak256(abi.encodePacked(prefabNumStatNames[i])) ==
          keccak256(abi.encodePacked(baseStats[j]))
        ) {
          uint256 prefabStat = prefab.numStatValues[i];
          prefabSum += prefabStat;

          break;
        }
      }
    }
    for (uint256 i = 0; i < baseStats.length; i++) {
      string memory prefabStat = baseStats[i];
      uint256 tokenStat = stats.getNumStat(tokenIds[0], prefabStat);
      gatchaSum += tokenStat;
    }



    uint8[] memory rarities = heroStatsGatcha.getRarityOdds();
    uint256 rarity = stats.getNumStat(tokenIds[0], "rarity" );

    uint8[] memory rarityStats = heroStatsGatcha.getStartingStats();



    // console.log('prefabSum ', prefabSum);
    // console.log('gatcha adds ', rarityStats[rarity]);
    // console.log('fullRolledSum ', gatchaSum);
    
    assertEq(gatchaSum, prefabSum + rarityStats[rarity]);

    // assert gatcha sum is rarity base stats
    // assert different between prefab sum and gatcha sum is also rarity base stats

    // assertGt(gatchaSum, 0);
  }

  function test_mint_resolver() public {
    uint256 prefabId = 1;

    vm.prank(address(1));
    minting.mintHero{value: 0.05 ether}(prefabId);

    uint256[] memory tokenIds = hero.tokensOfOwner(address(1));

    Resolver[] memory resolvers = heroStatResolver.getResolvers();

    for (uint256 i = 0; i < resolvers.length; i++) {
      Resolver memory resolver = resolvers[i];
      if (resolver.addition != 0) {
        uint256 tokenStat = stats.getNumStat(tokenIds[0], resolver.newStat);
        assertEq(tokenStat, resolver.addition);
      }
      if (resolver.multiplier != 0) {
        uint256 baseStat = stats.getNumStat(tokenIds[0], resolver.baseStat);
        uint256 tokenStat = stats.getNumStat(tokenIds[0], resolver.newStat);
        uint256 toAdd = (baseStat * resolver.multiplier) / 100;
        assertEq(tokenStat, toAdd);
      }
    }  
  }

  function test_mint_fail_no_value() public {
    vm.prank(address(1));
    vm.expectRevert(0xbfe3a4f1);
    minting.mintHero(1);
  }
}
