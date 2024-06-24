'use client';

import { GlobeAltIcon } from '@heroicons/react/20/solid';
import useDeployment from "@/hooks/useDeployment";
import { executeFlow } from '@/services/viemService';
import { gameAbi, queueSessionAbi, rewardErc20Abi, rockPaperScissorsAbi, useReadGameFactoryGetGames, useReadPvpResultGetLastGame, useReadQueueSessionGetPlayerCount, useReadQueueSessionIsPlayerInQueue, useWatchQueueSessionJoinedQueueEvent, useWatchRockPaperScissorsGameResultEvent, useWriteGame, useWriteGameExecuteFlow, watchRockPaperScissorsGameResultEvent } from '@/generated';
import { GameFuncParams } from '@/domain/Domain';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import useThrowBall from '@/mutations/useThrowBall';
import { Abi, Address, decodeEventLog, erc20Abi, erc721Abi, zeroAddress } from 'viem';
import SmallTitle from '@/components/base/SmallTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { config } from '@/domain/WagmiConfig';
import { bigIntReplacer, pretty } from '@/domain/utils';


export default function RPSAction() {

    const { deploy } = useDeployment();
    const { address } = useAccount();

    // const { data: games, error: gameError } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: queueSize, error: queueError, refetch: refetchQueuePlayers } = useReadQueueSessionGetPlayerCount({ address: deploy.queueComponent, args: [deploy.rpsGame] });
    const { data: inQueue, error: inQueueError, refetch: refetchInQueue } = useReadQueueSessionIsPlayerInQueue({ address: deploy.queueComponent, args: [deploy.rpsGame, address ? address : zeroAddress] });
    // const {data: lastGame, error: lastGameError } = useReadPvpResultGetLastGame({address: deploy.resultComponent, args: [address ? address : zeroAddress, deploy.rpsGame]});
    const { data: lastGame, error: lastGameError, refetch: refetchGetLastGame } = useReadPvpResultGetLastGame({ address: deploy.resultComponent, args: [deploy.rpsGame, address ? address : zeroAddress] });


    const { data: hash, error: writeError, writeContract } = useWriteGame();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

    const [selected, setSelected] = useState<number>(0);

    let actionmap = [
        // { num: "0", value: 'not found?' },
        { num: "1", value: 'Rock' },
        { num: "2", value: 'Paper' },
        { num: "3", value: 'Scissors' }
    ]


    const executeFlowTx = (action: number) => {
        console.log("games and address", address)
        if (!address) {
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
        // console.log("params", params);
        // console.log("watching for component: ", deploy.rpsComponent)
        // console.log("watching for game: ", deploy.rpsGame)
        writeContract({ address: deploy.rpsGame, functionName: "executeFlow", args: ["playRPS", params] });


    }

    useEffect(() => {
        if (queueError) {
            toast.error(queueError.message);
        }
        if (writeError) {
            toast.error(writeError.message);
        }
        if (isLoading) {
            toast.info("Transaction is pending");

        }
        if (isSuccess) {
            toast.success("Transaction is successful");
            refetchGetLastGame();
            refetchQueuePlayers();
            refetchInQueue();
        }
        // if (data) {
        //     console.log("data", data.logs);
        //     const MY_ABI: Abi = [...gameAbi, ...rockPaperScissorsAbi, ...rewardErc20Abi, ...queueSessionAbi, ...erc20Abi, ...erc721Abi];

        //     data.logs.map((log: any) => {
        //         try {
        //             const wat = decodeEventLog({ abi: MY_ABI, ...log });
        //             console.log(wat)
        //             if (wat.eventName == "GameResult") {
        //                 console.log("game result", wat)
        //             }
        //         } catch (e) {
        //             console.log("bad abi")
        //         }

        //     });
        // }
    }, [queueError, writeError, isLoading, isSuccess, data]);



    return (
        <section className='relative min-h-96 md:min-h-full' >
            <div className='p-4 text-2xl'>
                Rock Paper Scissors
            </div>


            <div className='px-4 text-lg font-outfit'>
                Choice
            </div>

            <div className='flex gap-2 p-4 text-xs font-outfit'>
                {actionmap.map((element, i) => {
                    return (
                        <button
                            key={i}
                            className={'justify-center py-4 border rounded-md basis-1/3 bg-slate-800 ' + ((selected === i) ? 'border-selected text-selected' : 'border-unselected text-unselected')}
                            onClick={() => { setSelected(i); }}
                        >
                            {element.value}
                        </button>

                    );
                })}


            </div>
            <div className='absolute bottom-0 flex p-4 inset-x-1'>
                <button
                    className='flex-grow py-2 mx-auto text-black rounded-md basis-0 bg-tavernGreen'
                    onClick={() => { executeFlowTx(selected); }}
                >
                    play
                </button>
            </div>



        </section >
    );
}
