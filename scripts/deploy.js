// const {ethers} = require("hardhat");
import pkg from "hardhat";
const {ethers, artifacts} = pkg;
// require("@nomiclabs/hardhat-ethers");

import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//we want to saveContractToFrontend
function saveContractToFrontend(contract, name) {
    const contractsDir = __dirname + "/../src/frontend/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + `/${name}-address.json`,
        JSON.stringify({ address: contract.address }, undefined, 2)
    );

    const constractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        contractsDir + `/${name}.json`,
        JSON.stringify(constractArtifact, null, 2)
    );
}



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

    saveContractToFrontend(token, "SimpleDeFiToken");
    
}

// Run the deploy script
main().catch((error) => {
    console.error(error);
    // process.exitCode(1);
});
