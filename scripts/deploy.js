
import { ethers } from "hardhat";
const hre = require("hardhat")

async function main() {
  const Transactions = await hre.ethers.getContractFactory("Transaction")
  const transactions = await Transactions.deploy();


  //await transactions.deployed();

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
