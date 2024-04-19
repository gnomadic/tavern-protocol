# PLAYMINT

## Our Mission:

We believe in the power of play to foster stronger connections and shared experiences.  PLAYMINT empowers communities and their members by enabling the creation of codeless Web3 games built around existing NFTs. 

## What is PLAYMINT?

PLAYMINT is an on-chain game engine designed specifically for breathing life into existing NFTs and their communities. With PLAYMINT, you can easily create and deploy engaging games that leverage your community's NFTs as playable characters or valuable in-game assets.

## How does PLAYMINT work?

PLAYMINT utilizes a powerful combination of established game engine architecture and modern Web3 modular protocols, by relying on an Entity-Module architecture.  Game Logic is modular and resuable, so Modules only need to be written once and can be used across multiple games. Game Data storage is handled by Entities, which are uniquely created for each deployed Game.  This allows for a high degree of customization and flexibility in game design.

### Entity-Component Architecture:

Every game is built upon entities and modules.  

Entities store all the necessary stateful data associated with in-game objects or characters.  These entities are linked to on-chain NFTs, allowing for true ownership and transparent data storage.

Interchangeable modules handle specific gameplay mechanics (e.g., combat, crafting, resource management).  This modularity allows for customization and the creation of diverse game experiences.  There is an on-chian registry of all available modules, and Solidity developers can use our interfaces to build their own gameplay modules. 

### Proxy Clones and Stateless modules

A Game and it's Entities are on-chain contracts deployed as 1167 Proxies through a factory.  This allows anyone to create new games and entities by simply submitting transactions.  Gameplay modules are different, they are deployed once on chain and reused across all Games.  This approach allows us to have an onchain registry of all available modules any game can use.  

## What are the core features:

1. Entity Creation: Associate your existing NFT with a PLAYMINT entity, defining its in-game attributes and data.
2. Module Selection: Choose from pre-built modules to integrate desired gameplay mechanics into your game.
3. Community Focus: Deploy your game directly on the blockchain, fostering secure operation and community ownership.
4. NFT Utility: Unlock the full potential of your NFTs by transforming them into playable characters or valuable in-game assets.

## Additional FAQ Questions:

### Do I need to know how to code to use PLAYMINT?

No! PLAYMINT is designed for a no-code experience. You can create engaging games through our intuitive visual interface.  If you do know how to code, you can add custom modules by using the provided interface.  

### What types of NFTs and Tokens can I use with PLAYMINT?

PLAYMINT (can be) compatible with any ERC-20, ERC-721, or ERC-1155 token.  While these modules don't exist yet, with user demand it is very straightforward to use token ownership as a requirement to join a game, as a reward for winning, as a resource ingame, or even as an RPG character.  

### What are the benefits of using PLAYMINT for my community?

PLAYMINT offers a fun and interactive way to engage your community members. It allows you to create shared experiences centered around your NFTs and foster stronger connections.

### What are the monetization options for PLAYMINT games?

We're still figuring this out! Of course your NFT projects are yours to monetize, but that has nothing to do with PLAYMINT.

### Where can I learn more about building games with PLAYMINT?

We're just getting started! [Reach out on warpcast](https://warpcast.com/playmint)!
