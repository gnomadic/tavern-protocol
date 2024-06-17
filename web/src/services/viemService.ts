import { GameFuncParams, GameSummary } from '@/domain/Domain';
import { GameABI } from '@/domain/abi/GameABI';
import { Deployments } from '@/domain/deployments';
import { readPvpResultGetLastGame, readPvpResultGetSummary, readQueueSessionGetPlayerCount, readQueueSessionIsPlayerInQueue, simulateGameExecuteFlow, writeGameExecuteFlow } from '@/generated';
import { Abi, Address, Chain, PublicClient, WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem'
import { localhost, sepolia } from 'viem/chains'
import { State, CreateConnectorFn, Connector, createConfig } from 'wagmi';
import { writeContractMutationOptions } from 'wagmi/query';



let publicClient: PublicClient;
let walletClient: WalletClient;

const config = createConfig({
    chains: [sepolia],
    transports: {
        //   [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

function getPublicClient() {
    if (publicClient) {
        return publicClient;
    }
    publicClient = createPublicClient({
        chain: sepolia as Chain,
        transport: http(),
    })
    return publicClient;
}

function getWalletClient() {
    if (walletClient) {
        return walletClient;
    }
    walletClient = createWalletClient({
        chain: sepolia as Chain,
        transport: custom(window.ethereum)
    })
    return walletClient;
}

export function getDeployment(chainId: string) {
    for (const key in Deployments) {
        if (Deployments[key].chainId === chainId) {
            return Deployments[key];
        }
    }
    return Deployments.localhost;
}

export async function getBlockNumber() {

    const client = getPublicClient();

    const blockNumber = await client.getBlockNumber();
    return blockNumber;
}

export async function getGameSummary(chainId: string, gameAddress: Address): Promise<GameSummary> {
    const client = getPublicClient();

    const data = await client.readContract({
        address: gameAddress,
        abi: GameABI,
        functionName: 'getSummary',
    })


    return data as GameSummary;
}

// export async function getQueueSize(){
//     const client = getClient();

//     const data = await client.readContract({
//         address: '0x
// }

export async function getQueueSize(chainId: string, gameAddress: Address) {
    const client = getPublicClient();
    const deployment = getDeployment(chainId);

    const data = await readQueueSessionGetPlayerCount(config, {
        address: deployment.queueComponent,
        args: [gameAddress],

    })

    return data;
}

export async function isPlayerInQueue(chainId: string, gameAddress: Address, playerAddress: Address) {
    const client = getPublicClient();
    const deployment = getDeployment(chainId);

    const data = await readQueueSessionIsPlayerInQueue(config, {
        address: deployment.queueComponent,
        args: [gameAddress, playerAddress],

    })

    return data;
}

export async function getLastGame(chainId: string, gameAddress: Address, playerAddress: Address) {
    const client = getPublicClient();
    const deployment = getDeployment(chainId);

    const data = await readPvpResultGetLastGame(config, {
        address: deployment.resultComponent,
        args: [gameAddress, playerAddress],

    })

    return data;
}


// useReadQueueSessionGetPlayerCount
// useReadQueueSessionIsPlayerInQueue
// useReadPvpResultGetLastGame

export async function getGameResult(chainId: string, resultAddress: Address, gameAddress: Address, playerAddress: Address) {
    const client = getPublicClient();

    // const data = await client.readContract({
    //     address: resultAddress,
    //     abi: GameABI,
    //     functionName: 'getResult',
    //     args: [playerAddress]
    // })

    const data = await readPvpResultGetLastGame(config, {
        address: resultAddress,
        args: [gameAddress, playerAddress]
    })

    return data;
}



export async function executeFlow(address: Address, functionName: string, args: GameFuncParams) {

    const write = await writeGameExecuteFlow(config, {
        address: address,
        args: [
            functionName,
            args
        ],
    })

    return write;
}

export async function simulateGameFlow(address: Address, functionName: string, args: GameFuncParams) {
    const simulate = await simulateGameExecuteFlow(config, {
        address: address,
        args: [
            functionName,
            args
        ],
    })

    return simulate;
}



