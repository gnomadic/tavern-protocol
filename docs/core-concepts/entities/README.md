# ✉️ Entities

Entities are the fundamental data structures within the Tavern Protocol that store and manage game data securely on the blockchain. They serve as the backbone of decentralized games, holding vital information such as player details, item attributes, and game state. &#x20;

## Key Features

* **Data Storage:** Entities store both global game data, such as information about game rules and settings, and session-specific data, such as player positions and inventory contents.
* **Unique Per Game:** Entities are deployed as proxy clones, so each Game Instance will have it's own unique copy of all the Entities it requires. &#x20;
* **Flexibility:** Entities can be customized to accommodate various game requirements, allowing developers to define their own data structures and properties.  Entites must implement a base class and must register with the EntityFactory to be accessible by Tavern. &#x20;

## Entity Structure

Entities are implemented as smart contracts on the blockchain, with each contract representing a specific type of entity. For example, there may be separate entity contracts for players, items, sessions, and game rules.  There may be even more variation based on the data structures used to accommodate accessing the data as it is needed. &#x20;



## Keys

Keys are a string name to represent the data stored by an Entity.  For example, if an Entity stores data about Players, then the key can be `players`.  This key is fairly arbitrary, and is used by Components to be able to query for an Entity from the Game.  This approach introduces a loose coupling between entities and components, and allows for entity reuse across different components. &#x20;

## IEntity Interface

All entity contracts implement the `IEntity` interface, which defines standard methods for interacting with entities. These methods include:

* getAvailableKeys`():` Returns a string array representing the type of data managed by the entity.

### INumberEntity, IAddressEntity, and IStringEntity Interfaces

Depending on both how abstract the Entity is and the types of the data it stores, there are also typed Interfaces to allow for any component to access the Entity's data without importing the entire entity.

```
interface INumberEntity {
  function getNumber(string memory key) external view returns (uint256);
}

```



## Entity Management

Entities are created through the Entity Factory automatically when a Component is registered with a Game.  Entities are updated and accessed through the Game contract. &#x20;

### Entity Factory

The Entity Factory is responsible for deploying new entity contracts and managing their lifecycle. Deployment of Entities happens automatically by the component, when a component is added to a Game.  The Entity Factory supports registering new types of Entities. &#x20;

### Game Contract

The Game contract serves as the central hub for accessing and interacting with entities during gameplay.  When a Component is executing game logic, the component will request an Entity from the Game so that the Component can execute the functions it needs.  This decoupling allows for Entities to both have complex and custom logic if necessary for a given component, and also still maintain a relationship with a given Game. &#x20;

## Example Use Case

```solidity
// Example Player Location Entity Contract
contract PlayerLocationEntity is IEntity {
  mapping(address => Location) locations;

  function setAvailableKeys(string[] storage _keys) public override {
    keys.push('location');
  }

  function setLocation(address to, uint256 x, uint256 y) external {
    locations[to] = Location(x, y);
  }

  function getLocation(address to) public view returns (Location memory) {
    return locations[to];
  }

  struct Location {
    uint256 x;
    uint256 y;
  }
}
```

In this example, `PlayerLocationEntity` is a simple entity contract representing a player's location in a game. It implements the `IEntity` interface and provides methods for setting and retrieving player data.  As the data structure is more complicated than a simple number, it cannot leverage the INumberEntity interface and that is no problem. &#x20;

## Conclusion

Entities form the backbone of decentralized games built on the Tavern Protocol, providing a secure and flexible way to manage game data. Understanding how entities are structured and managed is essential for developers and creators looking to build immersive gaming experiences on the blockchain.
