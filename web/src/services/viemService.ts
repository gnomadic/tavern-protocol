import { GameSummary } from '@/domain/Domain';
import { GameABI } from '@/domain/abi/GameABI';
import { Address, Chain, PublicClient, createPublicClient, http } from 'viem'
import { localhost, sepolia } from 'viem/chains'



let publicClient: PublicClient;

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

export async function getGameSummary(chainId: string, gameAddress: Address) : Promise<GameSummary> {
    const client = getClient();

    const data = await client.readContract({
        address: gameAddress,
        abi: GameABI,
        functionName: 'getSummary',
    })

    return data as GameSummary; 
}

export async function prepareTx(){
    
    const client = getClient();

    const data = await client.prepareTransactionRequest({
        chain: sepolia as Chain,

    })
    return data;
}



