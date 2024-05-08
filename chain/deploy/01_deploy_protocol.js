const { verify, ZERO_ADDRESS } = require("../../deployments/utils");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const fs = require("fs");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // ------------------------------------- deploy

  const game = await deploy("Game", {
    from: deployer,
    log: true,
  });

  const entityFactory = await deploy("EntityFactory", {
    from: deployer,
    log: true,
  });

  const gameFactory = await deploy("GameFactory", {
    from: deployer,
    log: true,
  });

  const componentRegistry = await deploy("ComponentRegistry", {
    from: deployer,
    log: true,
  });


  const deployedFactory = await hre.ethers.getContractAt("GameFactory", gameFactory.address);
  const setGame = await deployedFactory.gameContract();
  const setFactory = await deployedFactory.entityFactory();

  let tx;

  if (setGame == ZERO_ADDRESS && setFactory == ZERO_ADDRESS) {
    tx = await deployedFactory.initialize(game.address, entityFactory.address);
    await tx.wait();
  } else {
    if (setGame != game.address) {
      tx = await deployedFactory.setGameContract(game.address);
      await tx.wait();
    }
    if (setFactory != entityFactory.address) {
      tx = await deployedFactory.setEntityFactory(entityFactory.address);
      await tx.wait();
    }
  }


  // ------------------------------------- write address megafile

  let networkName = hre.network.name;
  networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);

  const filename = "../deployments/" + networkName + "/tavern-deployment.json";
  let object = await JSON.parse(await fs.readFileSync(filename, 'utf8'));

  object.game = game.address;
  object.entityFactory = entityFactory.address;
  object.gameFactory = gameFactory.address;
  object.componentRegistry = componentRegistry.address;


  await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
  console.log("local address file created");

  // ------------------------------------- verify

  console.log("done deploying");
  if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("verifing");
    await verify(hre, game.address, "Game", "");
    await verify(hre, entityFactory.address, "EntityFactory", "");
    await verify(hre, gameFactory.address, "GameFactory", "");
    await verify(hre, componentRegistry.address, "ComponentRegistry", "");
  }



};

module.exports.tags = ["protocol"];
