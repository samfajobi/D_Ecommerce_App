//import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const {INFURA_API_KEY, PRIVATE_KEY} = process.env;

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.19",
    settings: { 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}

