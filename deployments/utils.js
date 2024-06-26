

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

async function deployComponent(){
    const queueSession = await deploy("QueueSession", {
        from: deployer,
        log: true,
        args: [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/QueueSession.json`],
      });
    
    
    
      const queueSessionEntity = await deploy("QueueSessionEntity", {
        from: deployer,
        log: true,
      });


      if (!await componentRegistry.isRegistered(queueSession.address)) {
        tx = await componentRegistry.register(queueSession.address);
        await tx.wait();
      }

      if (await entityFactory.getEntity("QueueSessionEntity") == ZERO_ADDRESS) {
        tx = await entityFactory.registerEntity("QueueSessionEntity", queueSessionEntity.address);
        await tx.wait();
      }
      object.queueSession = queueSession.address;

      if (chainId !== "31337" && hre.network.name !== "localhost" && hre.network.name !== "1337") {
        console.log("verifing");
        await verify(hre, queueSession.address, "QueueSession", "components/", [`http://ipfs.io/ipfs/${IPFS_COMPONENTS}/QueueSession.json`]);
        await verify(hre, queueSessionEntity.address, "QueueSessionEntity", "entities/");
        

}



const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const IPFS_COMPONENTS = 'QmdW8chcERiTXdRAtmRn5VsAJqbNCtP34ZNiYMk6KMGLpQ';

const IPFS_GAMES = 'QmVSwRPRRPUe6mUx7Q3VxoQ8YFKfyU6x4abjBKWdT5hkrd';

module.exports = {
    getDeployedContract,
    verify,
    ZERO_ADDRESS,
    IPFS_COMPONENTS,
    IPFS_GAMES
};
