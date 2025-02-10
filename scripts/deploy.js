// const {ethers} = require("hardhat");
import pkg from "hardhat";
const {ethers} = pkg;
// require("@nomiclabs/hardhat-ethers");



async function main() {
    const [deployer] = await ethers.getSigners();


    const provider = deployer.provider;
    const balance = await provider.getBalance(deployer.address)

    const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
    const token = await tokenContractFactory.deploy();
    await token.deployed();
    console.log("Simple Defi Token address: ", token.address);
    console.log("Deployer address: ", deployer.address);
    console.log("same balance", ((await deployer.getBalance()).toString()));

    console.log("Deployer ETH balance: ", balance);
    
}

// Run the deploy script
main().catch((error) => {
    console.error(error);
    // process.exitCode(1);
});
