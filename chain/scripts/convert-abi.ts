const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

    const jsonAbi = require("../artifacts/src/components/PVPResult.sol/PVPResult.json").abi;
  
    const iface = new ethers.Interface(jsonAbi);
    console.log(iface.format(true));
  
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });