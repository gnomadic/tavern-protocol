

async function verify(hre, address_, contractName_, dir_ = "", args_ = []) {
    try {
        await hre.run("verify:verify", {
            address: address_,
            contract: `src/${dir_}${contractName_}.sol:${contractName_}`,
            constructorArguments: args_,
        });
    } catch (error) {
        console.log("error:", error.message);
    }
}



async function getDeployedContract(name) {
    const deployment = await deployments.get(name);
    return await ethers.getContractAt(name, deployment.address);
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const IPFS_COMPONENTS = 'QmZPVG81rB2Ppr93hudg5yJUJRh64QnozbBxZH6fsVSxE7';

const IPFS_GAMES = 'QmazHCMAoLMjkt2Qm3KfNnzbRbjP1yYsdhEbaX7m4d5Tz6';

module.exports = {
    getDeployedContract,
    verify,
    ZERO_ADDRESS,
    IPFS_COMPONENTS,
    IPFS_GAMES
};
