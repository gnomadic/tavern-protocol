'use client';

import { GlobeAltIcon } from '@heroicons/react/20/solid';
import useDeployment from "@/hooks/useDeployment";
import { executeFlow } from '@/services/viemService';
import { useReadGameFactoryGetGames, useWriteGame, useWriteGameExecuteFlow } from '@/generated';
import { GameFuncParams } from '@/domain/Domain';
import { useAccount } from 'wagmi';
import useThrowBall from '@/mutations/useThrowBall';

export default function PlayRPS() {

    const { deploy } = useDeployment();
    const { data: games } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
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
        writeContract({ address: '0x5671A42608c06180CfE1c86919d68a65d99F450E', functionName: "executeFlow", args: ["playRPS", params] });



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
        </section >
    );
}
