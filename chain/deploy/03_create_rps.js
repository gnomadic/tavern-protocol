const { get } = require("http");
const { verify, getDeployedContract, ZERO_ADDRESS } = require("../../deployments/utils");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const fs = require("fs");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  //   // ------------------------------------- deploy


  const gameName = "Rock Paper Scissors";

  const gameFactory = await getDeployedContract("GameFactory");
  const queueComponent = await getDeployedContract("QueueSession");
  const RPS = await getDeployedContract("RockPaperScissors");
  const rewardComponent = await getDeployedContract("RewardERC20");

  let gameSummary = await getGame(gameName);

  let exists = gameSummary !== undefined;

  // console.log("game exists", exists);
 

  let tx;
  if (!exists) {
    console.log("creating game");
    // tx = await gameFactory.createGame(deployer, gameName);
    // await tx.wait();
  } else{
    console.log("game exists");
  }

  gameSummary = await getGame(gameName);

  

  // const game = await getDeployedContract("Game", gameSummary.game);

  const game = await hre.ethers.getContractAt("Game", gameSummary.game);
  // console.log("game", game);
  // console.log('queueComponent', queueComponent);



  let functions = gameSummary.availableFunctions;
  let flows = gameSummary.flows;
  let description = gameSummary.description;
  let gameUrl = gameSummary.gameUrl;


  console.log("functions", functions);
  console.log("flows", flows);
  console.log("description", description);
  console.log("gameUrl", gameUrl);

  const queueExists = functions.find((f) => f.value === queueComponent.target);
  const rpsExists = functions.find((f) => f.value === RPS.target);
  const rewardExists = functions.find((f) => f.value === rewardComponent.target);

  // console.log("queue address", queueComponent.target);

  
  if (!queueExists) {
    console.log("adding Queue");
    tx = await game.addComponent(queueComponent.target);
    await tx.wait();
  } else {
    console.log("queue exists");
  }

  if (!rpsExists) {
    console.log("adding RPS");
    tx = await game.addComponent(RPS.target);
    await tx.wait();
  } else {
    console.log("rps exists");
  }

  if (!rewardExists) {
    console.log("adding Reward");
    tx = await game.addComponent(rewardComponent.target);
    await tx.wait();
  } else {
    console.log("reward exists");
  }

  if (description === "" || description === undefined) {
    console.log("adding description");
    tx = await game.updateDescription("A multiplayer Rock Paper Scissors game");
    await tx.wait();
  } else {
    console.log("description exists");
  }

  if (gameUrl === "" || gameUrl === undefined) {
    console.log("adding gameUrl");
    tx = await game.updateGameUrl("https://www.playtavern.com/farcade/rps");
    await tx.wait();
  } else {
    console.log("gameUrl exists");
  }

  if (flows === undefined || flows.length === 0) {
    console.log("adding flows");

    let keys = [];
    keys.push({name: 'setMatchOrWait(address,address)', value: queueComponent.target});
    keys.push({name: 'oneOnOne(address,address)', value: RPS.target});
    keys.push({name: 'reward(address,address)', value: rewardComponent.target});
 


    tx = await game.createFlow("playRPS", keys);
    await tx.wait();
  } else {
    console.log("flows exists");
  }


  





  // const game = await gameFactory.getGames(0);
  // tx = game.addComponent(queueComponent.address);
  // await tx.wait();

  // tx = game.addComponent(RPS.address);
  // await tx.wait();

  // tx = game.addComponent(rewardComponent.address);
  // await tx.wait();
  async function getGame(name) {
    const games = await gameFactory.getGames(0);
    let game = undefined;
    for (let i = 0; i < games.length; i++) {
      if (games[i].displayName === name) {

        game = games[i];
        return game;
      }
    }
    return game;
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


module.exports.tags = ["protocol"];
