const { verify } = require("../../deployments/utils");

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, getChainId, ethers } = hre;
    const fs = require("fs");
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

  
    // ------------------------------------- deploy
  
    const color = await deploy("Color", {
      from: deployer,
      log: true,
    });

    const chainellationRenderer = await deploy("ChainellationRenderer", {
      from: deployer,
      libraries: {
        Color: color.address
      },
      log: true,
    });
  
    const Chainellation = await deploy("Chainellation", {
      from: deployer,
      args: [chainellationRenderer.address],
      libraries: {
        Color: color.address,
      },
      log: true,
    });
  
  
    // ------------------------------------- write address megafile
  
    let networkName = hre.network.name;
    networkName === "hardhat" ? (networkName = "localhost") : (networkName = hre.network.name);
  
    const object = {};
    object.Chainellation = Chainellation.address;

    const filename = "../deployments/" + networkName + "/starsystem-deployment.json";


    await fs.writeFileSync(filename, JSON.stringify(object, null, 2));
    console.log("local address file created");
  
    // ------------------------------------- verify
  
    console.log("done deploying");
    if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
      console.log("verifing");
      await verify(hre, color.address, "Color", "tokens/solar/");
      await verify(hre, chainellationRenderer.address, "ChainellationRenderer", "tokens/solar/chainellations");
      await verify(hre, Chainellation.address, "Chainellation", "tokens/solar/chainellations");

    }
  
  };
  
  module.exports.tags = ["tokens", "starsystems"];
  