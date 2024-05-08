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

    const { throwHash, throwError, throwPending, throwSuccess, writeThrow } = useThrowBall({ game: deploy.gameFactory, moduleAddress: deploy.componentRegistry, player: address! });




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
        writeContract({ address: '0xa040245440C7711232C0aB3fA5a62D09bB266818', functionName: "executeFlow", args: ["playRPS", params] });
        writeThrow();



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
                
                <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                    disabled={throwPending && !throwSuccess}
                    onClick={() => {
                        writeThrow()
                    }}
                >
                    {throwSuccess ? `Thrown` : throwPending ? 'Confirming...' : throwError ? `Error!` : `Throw`}
                </button>
            </div>
            <div>{JSON.stringify(error?.message)}</div>
        </section >
    );
}
