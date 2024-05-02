# 🧱 Components

Components are pre-built tools and functionalities within the Tavern Protocol that handle specific actions within games. They interact with entities to access and update game data, allowing game creators to implement various gameplay mechanics without starting from scratch or writing code.  Components follow the Single Responsibility Principle, and only provide one feature. &#x20;

## Key Features

* **Modularity:** Components are designed to be modular, allowing developers to mix and match them to create custom gameplay experiences.
* **Reusability:** Components do store any data themselves, and are designed to be reused across different games.
* **Customizability:** Developers can customize components to suit their game's specific requirements by adjusting parameters and configurations (which is stored in an Entity).

## Component Types

The Tavern Protocol offers a variety of pre-built components to cater to different gameplay functionalities. Some common types of components include:

* **Player Management:** Handles player registration, authentication, and profile management.
* **Game Sessions:** Manages game sessions, including creation, joining, and management of multiplayer sessions.
* **Combat Mechanics:** Implements combat systems, including damage calculation, hit detection, and status effects.
* **Inventory Management:** Manages player inventories, including item acquisition, storage, and usage.
* **Resource Allocation:** Handles resource management, including currency, energy, and experience points.

## Component Registry

All approved components are registered in the Component Registry, a centralized repository that tracks available components and their functionalities. Game Creators can browse the registry to discover and integrate components into their games.  Developers can submit requests to get their custom components added to the registry for everyone to use. &#x20;

## Interaction with Entities

When a component is added to a Game, it will automatically create any Entities it may need to manage it's own state.

Components interact with entities to access and update game data during gameplay. They utilize methods provided by entity contracts to query and modify entity properties as needed. &#x20;

## Example Use Case

```solidity
// Example Combat Component Contract
contract CombatComponent {
...
    function dealDamage(address player, address gameAddress) external {
        // get damage dealt
        uint256 damage = INumberEntity(game.getEntity('playerStats')).getNumber(attacker, 'damage');
        // Retrieve player health from entity
        uint256 playerHealth = INumberEntity(game.getEntity('playerStats')).getNumber(player, 'health');
        INumberEntity(game.getEntity('playerStats')).setNumber(player, 'health', playerHealth - damage);
    }
}
```

This example is oversimplified, but hopefully makes the usage clear. `CombatComponent` is a simple component contract responsible for dealing damage to players in the game.   It requests the damage an attacker does as well as the health of the current player from the playerStats Entity.  Then, it updates the player's health to reflect the damage they just took.  As you can see the Component does not store any of it's own state, only requiring the Game to have an entity which provides a `playerStats` Key and a adheres to the `INumberEntity` interface.

## Conclusion

Components are essential building blocks within the Tavern Protocol, enabling game creators to implement diverse gameplay mechanics with ease. By leveraging pre-built components and customizing them to fit their game's needs, developers can create immersive and engaging gaming experiences on the blockchain.
