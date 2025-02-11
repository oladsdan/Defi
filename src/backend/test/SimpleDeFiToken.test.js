import { expect } from "chai";
import pkg from "hardhat";
import {toWei, fromWei} from "./Utils.js";

const { ethers } = pkg;

// const { expect } = require("chai");
// const { pkg} = require("hardhat");
// const { toWei, fromWei } = require("./Utils");

// const { ethers } = pkg;


describe("SimpleDeFiToken", () => {
    let deployer, user1, user2, token;

    beforeEach(async () => {
        [deployer, user1, user2] = await ethers.getSigners();
        const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
        token = await tokenContractFactory.deploy();
        await token.deployed();
    });

    it("Should have correct name, symbol and total supply", async () => {
        expect(await token.name()).to.equal("Simple DeFi Token");
        expect(await token.symbol()).to.equal("SDFT");
        expect(await token.totalSupply()).to.equal(toWei(1000000));
    });


    // it("Should transfer tokens between accounts", async () => {
    //     expect(await token.balanceOf(deployer.address)).to.equal(toWei(1000000));
    //     await token.connect(deployer).transfer(user1.address, toWei(1000));
    //     expect(await token.balanceOf(user1.address)).to.equal(toWei(1000));
    //     expect(await token.balanceOf(deployer.address)).to.equal(toWei(999000));

    //     //cannot transfer when transfer amount exceed the balance
    //     // await expect(token.connect(user1).transfer(user2.address, toWei(1001))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    // })

    it("Should burn token automatically when calling transferWithAutoBurn", async () => {
        await token.connect(deployer).transfer(user1.address, toWei(1));
        await token.connect(user1).transferWithAutoBurn(user2.address, toWei(1));
    })
});