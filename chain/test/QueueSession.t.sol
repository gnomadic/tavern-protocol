// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from 'forge-std/Test.sol';
import {GameFactory} from '../src/GameFactory.sol';
import {IGame} from '../src/interfaces/IGame.sol';
import {Game} from '../src/Game.sol';
import {QueueSession} from '../src/components/QueueSession.sol';

contract QueueSessionTest is Test {
  GameFactory factory;
  Game liveGame;

  QueueSession component;
}
