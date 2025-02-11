import pkg from "hardhat";
const {ethers} = pkg;

export const toWei = (value) => {
    return ethers.utils.parseEther(value.toString());
}

export const fromWei = (value) => {
    return ethers.utils.formatEther(value.toString());
}