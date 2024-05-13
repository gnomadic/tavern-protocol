'use client';

import { GlobeAltIcon } from '@heroicons/react/20/solid';
import useDeployment from "@/hooks/useDeployment";
import { executeFlow } from '@/services/viemService';
import { useReadGameFactoryGetGames, useReadQueueSessionGetPlayerCount, useWriteGame, useWriteGameExecuteFlow } from '@/generated';
import { GameFuncParams } from '@/domain/Domain';
import { useAccount } from 'wagmi';
import useThrowBall from '@/mutations/useThrowBall';
import { Address } from 'viem';

type PlayRPSProps = {
    gameAddress: Address;
}

export default function PlayRPS(props: PlayRPSProps) {

    const { deploy } = useDeployment();
    const { data: games } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
     const {data: queueSize, error: quueError} = useReadQueueSessionGetPlayerCount({address:"0xa20884C2DFBFF5776B53D82B89acD6e7F770984e", args: [props.gameAddress]});
    
    const { address } = useAccount();

    const { data, isPending, isSuccess, error,  writeContract } = useWriteGame();

    const executeFlowTx = (action: number) => {
        console.log("games and address", games, address)
        if (!games || !address) {
            console.log("too soon!");
            return;
        }
        console.log(action);
        const params: GameFuncParams = {
            strings: [],
            uints: [{ name: 'action', value: BigInt(action) }],
            addresses: [{ name: "player", value: address! }],
        }

        // const write = await executeFlow(games[0].game, "playRPS", params);
        console.log("params", params);
        writeContract({ address: props.gameAddress, functionName: "executeFlow", args: ["playRPS", params] });



    }

    return (
        <section className='pb-24' >
            <div className='pb-8 text-4xl'>
                Try it out on {deploy.chain}
            </div>
            <div className='flex justify-center pt-4 align-middle justify-items-center'>
                <div className='mx-auto'>
                    <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'
                        onClick={() => {
                            executeFlowTx(1)
                        }}> ROCK
                    </button>
                </div>
                <div className='mx-auto'>
                    <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'
                        onClick={() => { executeFlowTx(2); }}>

                        PAPER
                    </button>
                </div>
                <div className='mx-auto'>
                    <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'
                        onClick={() => { executeFlowTx(3); }}>

                        SCISSORS
                    </button>
                </div>
        
            </div>
            <div>{JSON.stringify(error?.message)}</div>

            <div className='pt-12'>
                There are {queueSize?.toString()} players in the queue.
            </div>
            {error ? 
            <div>
                error {JSON.stringify(error?.message)}
             </div> :<></>
}
        </section >
    );
}
