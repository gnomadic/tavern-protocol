import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
    Abi,
    Address,
    createPublicClient,
    encodeFunctionData,
    getContract,
    http,
} from "viem";
import { optimism, sepolia } from "viem/chains";
import { GAME_ABI } from "./abi";
import { GameFuncParams } from "@/domain/Domain";
import { frames } from "../frames";

// export async function POST(
//     req: NextRequest
// ): Promise<NextResponse<TransactionTargetResponse>> {
//     const json = await req.json();
//     let action = req.nextUrl.searchParams.get('flag')
//     console.log("txdata route action: ", action)

//     if (!action){
//         action = "0";
//     }


//     const frameMessage = await getFrameMessage(json);

//     if (!frameMessage) {
//         throw new Error("No frame message");
//     }

//     // Get current storage price
//     // const units = 1n;


//     const params: GameFuncParams = {
//         strings: [],
//         uints: [{ name: 'action', value: BigInt(action) }],
//         addresses: [{ name: "player", value: address! }],
//     }

//     const calldata = encodeFunctionData({
//         abi: GAME_ABI,
//         functionName: "executeFlow",
//         args: [BigInt(frameMessage.requesterFid), units],
//     });

//     const publicClient = createPublicClient({
//         chain: optimism,
//         transport: http(),
//     });

//     const STORAGE_REGISTRY_ADDRESS = "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D";

//     const storageRegistry = getContract({
//         address: STORAGE_REGISTRY_ADDRESS,
//         abi: GAME_ABI,
//         client: publicClient,
//     });

//     const unitPrice = await storageRegistry.read.price([units]);

//     return NextResponse.json({
//         chainId: "eip155:10", // OP Mainnet 10
//         method: "eth_sendTransaction",
//         params: {
//             abi: GAME_ABI as Abi,
//             to: STORAGE_REGISTRY_ADDRESS,
//             data: calldata,
//             value: unitPrice.toString(),
//         },
//     });
// }

const handleRequest = frames(async (ctx) => {

    const action = ctx.searchParams.action;
    const game = ctx.searchParams.game;
    const userAddress = ctx?.message?.connectedAddress;

    if (!action) {

    }
    console.log("action", action);
    console.log("game", game);
    console.log("userAddress", userAddress);

    let numberAction = 0;
    if (action === "rock") {
        numberAction = 1;
    } else if (action === "paper") {
        numberAction = 2;
    } else if (action === "scissors") {
        numberAction = 3;
    }


    const params: GameFuncParams = {
        strings: [],
        uints: [{ name: 'action', value: BigInt(numberAction) }],
        addresses: [{ name: "player", value: userAddress! as Address }],
    }

    const calldata = encodeFunctionData({
        abi: GAME_ABI,
        functionName: "executeFlow",
        args: ["playRPS", params],
    });

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(),
    });

    const gameContract = getContract({
        address: game as Address,
        abi: GAME_ABI,
        client: publicClient,
    });

    return NextResponse.json({
        chainId: "eip155:11155111",
        method: "eth_sendTransaction",
        params: {
            abi: GAME_ABI as Abi,
            to: game,
            data: calldata,
        },
    });



});

export const POST = handleRequest;