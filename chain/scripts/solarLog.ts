
import { ethers } from "hardhat";
// import { getDeployedContract } from "../../deployments/utils.js";
import { getDeployedContract } from "../../deployments/utils.js"
const hre = require("hardhat");
const fs = require("fs");

const deployments = hre.deployments;

async function main() {
  await deployments.fixture(["starsystems"]);

  let contract = await getDeployedContract("Chainellation");
  console.log("connected");


    let svg = await contract.generateSVG(1);
    
    console.log(svg);  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
