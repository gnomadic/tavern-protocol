// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract MMONeighborInteractionEntity is IEntity {
  address public game;
  string[] public keys;



//   mapping(address => Balls) private playerStatus;
//   // track the number of balls
//   uint256 public availableInteraction;
//   // track each ball's current interaction
//   mapping(uint256 => Interaction) public interactions;




//   // // TODO pull this into a struct so it's not 3 mappings
//   // // track who has a ball but hasn't created an interaction yet
//   // mapping(address => uint256[]) public canInteract;
//   // // track who has a ball in the air as an interaction
//   // mapping(address => uint256[]) public pendingInteractions;
//   // // track who can intercept a ball from an existing interaction
//   // mapping(address => uint256[]) public canIntercept;

//   //track indexes in the player array of who holds a ball
//   uint256[] public ballHolderIndexes;
//   //track indexes in the player array of who can catch a ball
//   uint256[] public ballCatcherIndexes;

//   // if I have a ball, I can throw it and it will be in the air an hour for each index the ball is travelling
//   // so player 1 can interact, so they throw it a distance.
//   // and a player 4 or less away can catch it
//   // someday that ball will be in the air for 4 hours in this example but today, whatever.

//   struct Interaction {
//     address giver;
//     address[] receivers;
//     uint256 distance;
//   }

//   struct Balls {
//     uint256[] holding;
//     uint256[] thrown;
//     uint256[] catchable;
//   }

  function initialize(address _game) external override {
    game = _game;
    keys.push('canInteract');
  }

  function getAvailableKeys() external view override returns (string[] memory) {
    return keys;
  }

//   // --------------------------------- ACTION FUNCTIONS ---------------------------------

//   function addNewInteractor(address player) external {
//     availableInteraction++;

//     playerStatus[player].holding.push(availableInteraction);

//     interactions[availableInteraction] = Interaction({
//       giver: player,
//       receivers: new address[](0),
//       distance: 0
      
//     });
//   }

//   function createInteraction(
//     address giver,
//     address[] memory receivers,
//     uint256 distance
//   ) external {
//     // console.log('can interact', canInteract[giver]);
//     // uint256 current = canInteract[giver][0];
//     uint256 current = playerStatus[giver].holding[playerStatus[giver].holding.length - 1];

//     interactions[current].giver = giver;
//     interactions[current].distance = distance;
//     interactions[current].receivers = receivers;

//     for (uint256 i = 0; i < receivers.length; i++) {
//       playerStatus[receivers[i]].catchable.push(current);
//       // console.log('can Intercept', canIntercept[receivers[i]]);
//     }

//     playerStatus[giver].thrown.push(current);
//     // pendingInteractions[giver].push(canInteract[giver][current]);
//     // canInteract[giver] = 0;
//     // canInteract[giver].pop();
//     playerStatus[giver].holding.pop();
//   }

//   function interceptInteraction(address player) external {
//     // uint256 intercepted = canIntercept[player];
//     uint256 intercepted = playerStatus[player].catchable[playerStatus[player].catchable.length - 1];



//     address[] memory receivers = interactions[intercepted].receivers;
//     for (uint256 i = 0; i < receivers.length; i++) {
//       canIntercept[receivers[i]] = 0;
//       playerStatus // fuck.
//     }

//     pendingInteractions[interactions[intercepted].giver] = 0;

    
//     interactions[intercepted].distance = 0;
//     interactions[intercepted].receivers = new address[](0);
//     interactions[intercepted].giver = player;

//     canInteract[player] = intercepted;

//     playerStatus[player].catchable.pop();
//   }


//  // --------------------------------- PLAYER INFO FUNCTIONS ---------------------------------

//    function getBallHolderIndexes() external view returns (uint256[] memory) {
//     return BallHolderIndexes;
//   }


//    function getCatchableIndexes() external view returns (uint256[] memory) {
//     return ballCatcherIndexes;
//   }



// // --------------------------------- VIEW FUNCTIONS ---------------------------------




//   function canPlayerInteract(address player) external view returns (bool) {
//     return canInteract[player] != 0;
//   }

//   function canPlayerIntercept(address player) external view returns (bool) {
//     return canIntercept[player] != 0;
//   }

//   function addBallHolderIndex(uint256 index) external {
//     getBallHolderIndexes.push(index);
//   }



//   function addBallCatcher(uint256 index) external {
//     ballCatchers.push(index);
//   }
}
