const { verify } = require("../../deployments/utils");

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, getChainId, ethers } = hre;
    const fs = require("fs");
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

  
    // ------------------------------------- deploy
  
    const farcadeAlphaTestTicket = await deploy("FarcadeAlphaTestTicket", {
      from: deployer,
      log: true,
    });
  
  
    // ------------------------------------- write address megafile
  
    let networkName = hre.network.name;
    networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);
  
    const object = {};
    object.farcadeAlphaTestTicket = farcadeAlphaTestTicket.address;

    const filename = "../deployments/" + networkName + "/tavern-deployment.json";
  
    await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
    console.log("local address file created");
  
    // ------------------------------------- verify
  
    console.log("done deploying");
    if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
      console.log("verifing");
      await verify(hre, farcadeAlphaTestTicket.address, "FarcadeAlphaTestTicket", "tokens/");

    }
  
  };
  
  module.exports.tags = ["tokens"];
  