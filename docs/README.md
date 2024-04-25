# Tavern

## Our Mission:
We believe in the power of play to foster stronger connections and shared experiences.  Tavern empowers communities and their members by enabling the creation of codeless Web3 games built around existing NFTs. 

## What is Tavern?
Tavern is an on-chain game engine protocol designed to make it easy to create games using web3 technologies and communities.  Tavern's modular architecture allows for the creation of diverse and engaging games that leverage the unique properties of NFTs and any other on-chain primitive.  

## How does Tavern work?
Tavern takes inspiration from familiar game engines like Unity and Unreal, but injects the power of Web3.  The idea is that a game's rules and a game's data are treated completely separately.  The rules are defined in "Components" and the data is stored in "Entities."  Game designers can then create "Game Functions" that define the flow of the game by calling the components and interacting with the entities.  This separation of concerns allows for the creation of complex games without writing complex code.

### Building Blocks: Components 
Imagine a toolbox filled with pre-built components like "combat," "crafting," or "resource management." These are Tavern components – smart contracts deployed once on the blockchain. Any game can leverage them, making them the reusable building blocks of everyone's game world.  Solidity developers can even build their own components and contribute to the on-chain registry, keeping the toolbox ever-expanding.  There are no restrictions on components, so if you can code it in Solidity, you can make it a components.  

### Data Containers: Entities
Components are like functions with no memory – they don't store data. That's where Entities come in. These are on-chain data containers that hold everything about your game objects and the overall game state – like the ultimate backpack for your game's stuff!  Imagine a deck of cards, where the cards themselves are defined in an Entity, as well as the cards in every player's hand. Entities are unique to each game and deployed as special "proxy contracts" for efficiency.

### The Orchestrator: Game Functions
Now for the real fun! Game Functions are the masterminds created by YOU, the game designer. These functions act like recipes, stringing together different components functions (think combat followed by looting) and interacting with the data stored in Entities.  This allows you to craft unique gameplay experiences without writing complex code from scratch.  You can create Game Functions by submitting transactions and not writing a line of code.

### Proxy Clones and Stateless components
The beauty lies in the separation of concerns. Components are reusable across games, while Entities hold game-specific data. This allows anyone to easily create new games by registering the components they need (which automatically deploys the entities they need) and creating Game Functions. It's like having a universal component library at your fingertips!

### Play and Create!
Tavern empowers anyone to build engaging games without getting bogged down in code.  So, unleash your creativity, explore the ever-growing component library, and start crafting the next generation of on-chain gaming experiences!
