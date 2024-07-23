const { get } = require("http");
const { verify, getDeployedContract, ZERO_ADDRESS, IPFS_GAMES } = require("../../deployments/utils");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const fs = require("fs");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  //   // ------------------------------------- deploy



  const registry = await deploy("SystemRegistry", {
    from: deployer,
    log: true,
  });

  const stats = await deploy("HeroStats", {
    from: deployer,
    log: true,
    args: [registry.address],
  });

  const simpleResolver = await deploy("SimpleCombatResolver", {
    from: deployer,
    log: true,
    args: [registry.address],
  });

  const combatActions = await deploy("CombatActions", {
    from: deployer,
    log: true,
    args: [registry.address],
  });

  const heroStatResolver = await deploy("HeroStatResolver", {
    from: deployer,
    log: true,
    args: [registry.address, stats.address],
  });

  const heroStatsGatcha = await deploy("HeroStatsGatcha", {
    from: deployer,
    log: true,
    args: [registry.address, stats.address],
  });

  const monsterStats = await deploy("MonsterStats", {
    from: deployer,
    log: true,
    args: [registry.address, combatActions.address],
  });

  const combatPVE = await deploy("CombatPVE", {
    from: deployer,
    log: true,
    args: [registry.address, monsterStats.address, stats.address, combatActions.address],
  });

  const minting = await deploy("Minting", {
    from: deployer,
    log: true,
    args: [registry.address],
  });

//   console.log("setting pve hero");
//  let tx = await pve.setHero(address(hero));
//   await tx.wait();

//   console.log("setting pve hero");
//   tx = minting.setHero(address(hero));
//   await tx.wait();

  let prefabLoaders = [
    stats.address,
    combatActions.address,
    heroStatsGatcha.address,
    heroStatResolver.address
  ]

  const deployedMinting = await getDeployedContract("Minting");
  const deployedRegistry= await getDeployedContract("SystemRegistry");

  console.log("setting prefab loaders");
  let tx = await deployedMinting.addPrefabLoader(prefabLoaders);
  await tx.wait();

  console.log("registering");
  let bulk = [
     stats.address,
     simpleResolver.address,
     combatActions.address,
     heroStatResolver.address,
     heroStatsGatcha.address,
     monsterStats.address,
     combatPVE.address,
     minting.address
  ]

  tx = await deployedRegistry.bulkRegister(bulk);
  await tx.wait();




// ------------------------------------- write address megafile
  
let networkName = hre.network.name;
networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);

const object = {};
object.registry = registry.address;
object.herostats = stats.address;
object.simpleResolver = simpleResolver.address;
object.combatActions = combatActions.address;
object.heroStatResolver = heroStatResolver.address;
object.heroStatsGatcha = heroStatsGatcha.address;
object.monsterStats = monsterStats.address;
object.combatPVE = combatPVE.address;
object.minting = minting.address;

const filename = "../deployments/" + networkName + "/heroes-deployment.json";


await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
console.log("local address file created");

// ------------------------------------- verify

console.log("done deploying");
if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
  console.log("verifing");


  await verify(hre, registry.address, "SystemRegistry", "heroes/", )
  await verify(hre, stats.address, "SystemRegistry", "heroes/systems", [registry.address])
  await verify(hre, simpleResolver.address, "SystemRegistry", "heroes/systems", [registry.address])
  await verify(hre, combatActions.address, "SystemRegistry", "heroes/systems", [registry.address])
  await verify(hre, heroStatResolver.address, "SystemRegistry", "heroes/systems", [registry.address, stats.address])
  await verify(hre, heroStatsGatcha.address, "SystemRegistry", "heroes/systems", [registry.address, stats.address])
  await verify(hre, monsterStats.address, "SystemRegistry", "heroes/systems", [registry.address, combatActions.address])
  await verify(hre, combatPVE.address, "SystemRegistry", "heroes/systems", [registry.address, monsterStats.address, stats.address, combatActions.address])
  await verify(hre, minting.address, "SystemRegistry", "heroes/systems", [registry.address])

}


}







  //   queueComponent = new QueueSession();
  //   registry.register(address(queueComponent));
  //   QueueSessionEntity queueEntity = new QueueSessionEntity();
  //   entityFactory.registerEntity('QueueSessionEntity', address(queueEntity));

  //   rpsComponent = new RockPaperScissors();
  //   registry.register(address(rpsComponent));
  //   RockPaperScissorEntity rpsEntity = new RockPaperScissorEntity();
  //   entityFactory.registerEntity('RockPaperScissorEntity', address(rpsEntity));

  //   rewardComponent = new RewardERC20();
  //   registry.register(address(rewardComponent));
  //   Reward20Entity rewardEntity = new Reward20Entity();
  //   entityFactory.registerEntity('Reward20Entity', address(rewardEntity));

  //   factory.createGame(deployPublicKey, 'Rock Paper Scissor Demo');
  //   Game liveGame = factory.games(0);

  //   liveGame.addComponent(address(queueComponent));
  //   liveGame.addComponent(address(rpsComponent));
  //   liveGame.addComponent(address(rewardComponent));



  //   const componentRegistry = await getDeployedContract("ComponentRegistry");
  //   const entityFactory = await getDeployedContract("EntityFactory");


  //   // ------------------------------------- Queue Session Component
  //   const queueSession = await deploy("QueueSession", {
  //     from: deployer,
  //     log: true,
  //   });

  //   const tx = await componentRegistry.register(queueSession.address); 
  //   await tx.wait();

  //   const queueSessionEntity = await deploy("QueueSessionEntity", {
  //     from: deployer,
  //     log: true,
  //   });

  //   tx = await entityFactory.registerEntity("QueueSessionEntity", queueSessionEntity.address);
  //   await tx.wait();


  //   // ------------------------------------- Rock Paper Scissors Component

  //   const rockPaperScissors = await deploy("RockPaperScissors", {
  //     from: deployer,
  //     log: true,
  //   });

  //   tx = await componentRegistry.register(rockPaperScissors.address);
  //   await tx.wait();

  //   const rockPaperScissorEntity = await deploy("RockPaperScissorEntity", {
  //     from: deployer,
  //     log: true,
  //   });

  //   tx = await entityFactory.registerEntity("RockPaperScissorEntity", rockPaperScissorEntity.address);
  //   await tx.wait();

  //   // ------------------------------------- Reward ERC20 Component

  //   const rewardERC20 = await deploy("RewardERC20", {
  //     from: deployer,
  //     log: true,
  //   });

  //   tx = await componentRegistry.register(rewardERC20.address);
  //   await tx.wait();

  //   const reward20Entity = await deploy("Reward20Entity", {
  //     from: deployer,
  //     log: true,
  //   });

  //   tx = await entityFactory.registerEntity("Reward20Entity", reward20Entity.address);
  //   await tx.wait();





  //   // ------------------------------------- write address megafile

  //   let networkName = hre.network.name;
  //   networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);

  //   const filename = "../deployments/" + networkName + "/tavern-deployment.json";
  //   let object = await JSON.parse(await fs.readFileSync(filename, 'utf8'));

  //   object.game = game.address;
  //   object.entityFactory = entityFactory.address;
  //   object.gameFactory = gameFactory.address;
  //   object.componentRegistry = componentRegistry.address;


  //   await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
  //   console.log("local address file created");

  //   // ------------------------------------- verify

  //   console.log("done deploying");
  //   if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
  //     console.log("verifing");
  //     await verify(game.address, "Game", "");
  //     await verify(entityFactory.address, "EntityFactory", "");
  //     await verify(gameFactory.address, "GameFactory", "");
  //     await verify(componentRegistry.address, "ComponentRegistry", "");
  //   }

  //   // ------------------------------------- helpers

  //   async function verify(address_, contractName_, dir_ = "", args_ = []) {
  //     try {
  //       await hre.run("verify:verify", {
  //         address: address_,
  //         contract: `src/${dir_}${contractName_}.sol:${contractName_}`,
  //         constructorArguments: args_,
  //       });
  //     } catch (error) {
  //       console.log("error:", error.message);
  //     }
  //   }

  //   async function getDeployedContract(name) {
  //     const deployment = await deployments.get(name);
  //     return await ethers.getContractAt(name, deployment.address);
  //   }


module.exports.tags = ["heroes"];
