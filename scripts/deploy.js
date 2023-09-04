
import { ethers } from "hardhat";
const hre = require("hardhat")

async function main() {
  const Transactions = await hre.ethers.getContractFactory("Transaction")
  const transactions = await Transactions.deploy();


  //await transactions.deployed();

  await transactions.waitForDeployment();

 
  const address = await transactions.getAddress();
  console.log(`Your transaction has been deployed to: ${address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
