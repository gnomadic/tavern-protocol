/** @type import('hardhat/config').HardhatUserConfig */
import 'dotenv/config'

import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-deploy";
import "hardhat-gas-reporter";

module.exports = {
  solidity: "0.8.24",

  networks: {

    sepolia: {
      url:  "https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
      accounts: [`${process.env.MAINNET_PRIVATE_KEY}`],
    },
    local:{
      url: "http://127.0.0.1:8545",
      accounts: [`${process.env.LOCAL_PRIVATE_KEY}`],
    }

  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.MAIN_ETHERSCAN_API_KEY,
    sepolia: process.env.MAIN_ETHERSCAN_API_KEY || "",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
