import { GameFuncParams, GameSummary } from '@/domain/Domain';
import { GameABI } from '@/domain/abi/GameABI';
import { simulateGameExecuteFlow, writeGameExecuteFlow } from '@/generated';
import { Address, Chain, PublicClient, createPublicClient, http } from 'viem'
import { localhost, sepolia } from 'viem/chains'
import { State, CreateConnectorFn, Connector, createConfig } from 'wagmi';
import { writeContractMutationOptions } from 'wagmi/query';



let publicClient: PublicClient;

const config = createConfig({
    chains: [sepolia],
    transports: {
        //   [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

function getClient() {
    if (publicClient) {
        return publicClient;
    }
    publicClient = createPublicClient({
        chain: sepolia as Chain,
        transport: http(),
    })
    return publicClient;
}

export async function getBlockNumber() {

    const client = getClient();

    const blockNumber = await client.getBlockNumber();
    return blockNumber;
}

export async function getGameSummary(chainId: string, gameAddress: Address): Promise<GameSummary> {
    const client = getClient();

    const data = await client.readContract({
        address: gameAddress,
        abi: GameABI,
        functionName: 'getSummary',
    })

    return data as GameSummary;
}

export async function simulateJoinRPS() {
    const simulate = await simulateGameExecuteFlow(config, {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        args: [
            "playRPS",
            {
                addresses: [],
                uints: [],
                strings: []
            }
        ],
    })

    return simulate;
}

export async function executeJoinRPS() {
    const write = await writeGameExecuteFlow(config, {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        args: [
            "playRPS",
            {
                addresses: [],
                uints: [],
                strings: []
            }
        ],
    })

    return write;
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



