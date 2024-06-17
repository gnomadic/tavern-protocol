const { verify, getDeployedContract, ZERO_ADDRESS, IPFS_COMPONENTS } = require("../../deployments/utils");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const fs = require("fs");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // ------------------------------------- deploy

  // ------------------------------------- Queue Session Component
  const queueSession = await deploy("QueueSession", {
    from: deployer,
    log: true,
    args: [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/QueueSession.json`],
  });



  const queueSessionEntity = await deploy("QueueSessionEntity", {
    from: deployer,
    log: true,
  });




  // ------------------------------------- Rock Paper Scissors Component

  const rockPaperScissors = await deploy("RockPaperScissors", {
    from: deployer,
    log: true,
    args: [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RPS.json`],
  });


  const rockPaperScissorEntity = await deploy("RockPaperScissorEntity", {
    from: deployer,
    log: true,
  });



  // ------------------------------------- Reward ERC20 Component

  const rewardERC20 = await deploy("RewardERC20", {
    from: deployer,
    log: true,
    args: [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RewardERC20.json`],
  });



  const reward20Entity = await deploy("Reward20Entity", {
    from: deployer,
    log: true,
  });

  // ------------------------------------- PVP Result Component

  const pvpResult = await deploy("PVPResult", {
    from: deployer,
    log: true,
    args: [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/PVPResult.json`],
  });

  const pvpResultEntity = await deploy("PVPResultEntity", {
    from: deployer,
    log: true,
  });





  const componentRegistry = await getDeployedContract("ComponentRegistry");
  const entityFactory = await getDeployedContract("EntityFactory");

  // ------------------------------------- register components

  let tx;

  if (!await componentRegistry.isRegistered(queueSession.address)) {
    tx = await componentRegistry.register(queueSession.address);
    await tx.wait();
  }


  if (!await componentRegistry.isRegistered(rockPaperScissors.address)) {
    tx = await componentRegistry.register(rockPaperScissors.address);
    await tx.wait();
  }

  if (!await componentRegistry.isRegistered(rewardERC20.address)) {
    tx = await componentRegistry.register(rewardERC20.address);
    await tx.wait();
  }

  if (!await componentRegistry.isRegistered(pvpResult.address)) {
    tx = await componentRegistry.register(pvpResult.address);
    await tx.wait();
  }

  // ------------------------------------- register entities
  if (await entityFactory.getEntity("QueueSessionEntity") == ZERO_ADDRESS) {
    tx = await entityFactory.registerEntity("QueueSessionEntity", queueSessionEntity.address);
    await tx.wait();
  }

  if (await entityFactory.getEntity("RockPaperScissorEntity") == ZERO_ADDRESS) {
    tx = await entityFactory.registerEntity("RockPaperScissorEntity", rockPaperScissorEntity.address);
    await tx.wait();
  }

  if (await entityFactory.getEntity("Reward20Entity") == ZERO_ADDRESS) {
    tx = await entityFactory.registerEntity("Reward20Entity", reward20Entity.address);
    await tx.wait();
  }

  if (await entityFactory.getEntity("PVPResultEntity") == ZERO_ADDRESS) {
    tx = await entityFactory.registerEntity("PVPResultEntity", pvpResultEntity.address);
    await tx.wait();
  }

  // ------------------------------------- write address megafile

  let networkName = hre.network.name;
  networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);

  const filename = "../deployments/" + networkName + "/tavern-deployment.json";
  let object = await JSON.parse(await fs.readFileSync(filename, 'utf8'));

  object.queueSession = queueSession.address;
  object.rockPaperScissors = rockPaperScissors.address;
  object.rewardERC20 = rewardERC20.address;
  object.pvpResult = pvpResult.address;

  await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
  console.log("local address file created");

  // ------------------------------------- verify

  console.log("done deploying");
  if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
    console.log("verifing");
    await verify(hre, queueSession.address, "QueueSession", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/QueueSession.json`]);
    await verify(hre, queueSessionEntity.address, "QueueSessionEntity", "entities/");
    
    await verify(hre, rockPaperScissors.address, "RockPaperScissors", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RPS.json`]);
    await verify(hre, rockPaperScissorEntity.address, "RockPaperScissorEntity", "entities/");
    
    await verify(hre, rewardERC20.address, "RewardERC20", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RewardERC20.json`]);
    await verify(hre, reward20Entity.address, "Reward20Entity", "entities/");
    
    await verify(hre, pvpResult.address, "PVPResult", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/PVPResult.json`]);
    await verify(hre, pvpResultEntity.address, "PVPResultEntity", "entities/");
  }

};

module.exports.tags = ["protocol"];
