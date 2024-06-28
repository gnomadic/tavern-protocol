const { verify, getDeployedContract, ZERO_ADDRESS, IPFS_COMPONENTS, deployComponent } = require("../../deployments/utils");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hre;
  const fs = require("fs");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // ------------------------------------- deploy

  
  // ------------------------------------- Queue Session Component

  let queueSessionAddress = await deployComponent(deploy, deployer, "QueueSession", "QueueSessionEntity", false);
  let rewardERC20Address = await deployComponent(deploy, deployer, "RewardERC20", "Reward20Entity", false);
  let rockPaperScissorsAddress = await deployComponent(deploy, deployer, "RockPaperScissors", "RockPaperScissorEntity", false);
  let pvpResultAddress = await deployComponent(deploy, deployer, "PVPResult", "PVPResultEntity", false);
  let MMOSessionAddress = await deployComponent(deploy, deployer, "MMOSessionModule", "MMOSessionEntity", false);
  let DailyInteractionAddress = await deployComponent(deploy, deployer, "DailyInteraction", "DailyInteractionEntity", false);
  let require1155Address = await deployComponent(deploy, deployer, "Require1155", "Require1155Entity", false);
  let reward1155Address = await deployComponent(deploy, deployer, "Reward1155", "Reward1155Entity", false);

  // ------------------------------------- write address megafile

  let networkName = hre.network.name;
  networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);

  const filename = "../deployments/" + networkName + "/tavern-deployment.json";
  let object = await JSON.parse(await fs.readFileSync(filename, 'utf8'));

  object.queueSession = queueSessionAddress;//queueSession.address;
  object.rockPaperScissors = rockPaperScissorsAddress;
  object.rewardERC20 = rewardERC20Address;
  object.pvpResult = pvpResultAddress;

  await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
  console.log("local address file created");

  // ------------------------------------- verify

  // console.log("done deploying");
  // if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
  //   console.log("verifing");
  //   // await verify(hre, queueSession.address, "QueueSession", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/QueueSession.json`]);
  //   // await verify(hre, queueSessionEntity.address, "QueueSessionEntity", "entities/");
    
  //   await verify(hre, rockPaperScissors.address, "RockPaperScissors", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RPS.json`]);
  //   await verify(hre, rockPaperScissorEntity.address, "RockPaperScissorEntity", "entities/");
    
  //   await verify(hre, rewardERC20.address, "RewardERC20", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/RewardERC20.json`]);
  //   await verify(hre, reward20Entity.address, "Reward20Entity", "entities/");
    
  //   await verify(hre, pvpResult.address, "PVPResult", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/PVPResult.json`]);
  //   await verify(hre, pvpResultEntity.address, "PVPResultEntity", "entities/");
  // }

};

module.exports.tags = ["protocol"];
