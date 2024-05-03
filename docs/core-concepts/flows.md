# 🌊 Flows

Flows are customizable sequences of components within the Tavern Protocol that define the gameplay logic of decentralized games.  By orchestrating the execution of components, flows enable developers to create dynamic and engaging gaming experiences tailored to their game's unique requirements.&#x20;

### Key Features

* **Customizability:** Flows allow developers to define custom sequences of components to implement specific gameplay mechanics and interactions.
* **Flexibility:** Developers have full control over the order and parameters of component execution within flows, allowing for dynamic and adaptive gameplay.
* **Interactivity:** Flows can respond to player actions and game events, triggering component execution based on predefined conditions and triggers.

## Flow Definition

Flows are defined by submitting transactions to the Game contract, where Game Creators specify the sequence of components to be executed during gameplay.  Each Flow is defined as a set of component addresses and the function to call on the component. &#x20;



```solidity
// Required Structs
struct AddressKey {address Address; string Key; }

struct GameFuncAddress { string name; address value; }
struct GameFuncUint { string name; uint256 value; }
struct GameFuncString { string name; string value; }

struct GameFuncParams {
  GameFuncAddress[] addresses;
  GameFuncUint[] uints;
  GameFuncString[] strings;
}
```



```
// Game functions to use Flows
function createFlow(string memory name, AddressKey[] memory funcs); 
function executeFlow(string memory name, GameFuncParams memory params);
```



## Flow Structure

When creating a Flow, the Game Creator must provide both:

1. **name:** A unique identifier for the flow.
2. **funcs:** A sequence of component calls, each specifying the component and it's function to be executed in order. &#x20;

### Example Flow

```
solidity
```

```solidity
  AddressKey[] joinKeys;

// Example Join Rock Paper Scissor Game Flow
function createFlow(address playerEntity, address enemyEntity) external {
    Game liveGame = factory.games(0);
    joinKeys.push(
      AddressKey(address(queueComponent), 'setMatchOrWait(address,address)')
    );
    joinKeys.push(
      AddressKey(address(rpsComponent), 'oneOnOne(address,address)')
    );
    joinKeys.push(AddressKey(address(rewardComponent), 'reward(address,address)'));

    liveGame.createGameFunction('playRPS', joinKeys);
}
```

Note that this example can be submitted as multiple transactions, it is only scripted for convenience.  When a player calls `executeFlow` and passes in `playRPS` as the name, the Game will execute three functions in order:

1. `setMatchOrWait` on the Queue Component
2. `oneOnOne` on the Rock Paper Scissors Component (RPS)
3. `reward` on the Reward Component

This works because the `setMatchOrWait` function will update the `currentMatchPlayers` property on the [Game Entity](entities/flowentity.md), which is loaded by the RPS component.  RPS will then set the `winner` on the Game Entity, which the Reward component can load. &#x20;

### Conclusion

Flows play a crucial role in defining the gameplay logic of decentralized games built on the Tavern Protocol. By customizing flows to suit their game's requirements, Game Creators can create immersive and interactive gaming experiences that captivate players and keep them coming back for more.  All this without writing a single line of code, and only submitting transactions. &#x20;
