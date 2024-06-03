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


export default function PlayRPS() {

    const { deploy } = useDeployment();
    const { address } = useAccount();

    const { data: games, error: gameError } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: queueSize, error: queueError } = useReadQueueSessionGetPlayerCount({ address: deploy.queueComponent, args: [deploy.rpsGame] });
    const { data: inQueue, error: inQueueError } = useReadQueueSessionIsPlayerInQueue({ address: deploy.queueComponent, args: [deploy.rpsGame, address ? address : zeroAddress] });
    const {data: lastGame, error: lastGameError } = useReadPvpResultGetLastGame({address: deploy.resultComponent, args: [address ? address : zeroAddress, deploy.rpsGame]});
    // const {data: lastGame, error: lastGameError } = useReadPvpResultGetLastGame({address: deploy.resultComponent, args: [deploy.rpsGame, address ? address : zeroAddress]});


    const { data: hash, error: writeError, writeContract } = useWriteGame();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })




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
        // console.log("params", params);
        console.log("watching for component: ", deploy.rpsComponent)
        console.log("watching for game: ", deploy.rpsGame)
        writeContract({ address: deploy.rpsGame, functionName: "executeFlow", args: ["playRPS", params] });


    }
    useEffect(() => {
        if (gameError) {
            toast.error(gameError.message);
        }
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

        }
        if (data) {
            console.log("data", data.logs);
            const MY_ABI: Abi = [...gameAbi, ...rockPaperScissorsAbi, ...rewardErc20Abi, ...queueSessionAbi, ...erc20Abi, ...erc721Abi];

            data.logs.map((log: any) => {
                try {
                    const wat = decodeEventLog({ abi: MY_ABI, ...log });
                    console.log(wat)
                    if (wat.eventName == "GameResult") {
                        console.log("game result", wat)
                    }
                } catch (e) {
                    console.log("bad abi")
                }

            });
        }
    }, [gameError, queueError, writeError, isLoading, isSuccess, data]);

    const replacer = (key, value) =>
        typeof value === 'bigint' ? value.toString() : value

    return (

        
        <section className='pt-24 px-12 md:px-24' >
            <section id='intro' className=' items-center p-12 md:p-18 md:pb-24'>
                {/* <div>{JSON.stringify(data?.logs)}</div> */}
                <div className='flex'>
                    <div className='justify-right md:w-1/2'></div>
                    <div className='justify-right md:w-1/2 '>
                        <p>
                            This is a multiplayer game of rock-paper-scissors with matchmaking.
                            This game was deployed using the Tavern game engine without writing any code.
                            <br />
                            <br />
                            First, the game was deployed using the Game Factory.
                            <br />
                            Then, three components were added to the game.
                            <br />
                            Finally, a Flow was created to call functions in order on all the components.
                            <br />
                            <br />
                            The buttons below will execute that created flow, passing in the players address and choice of action.
                            <br />
                            <br />
                            More details about this game can be found in the Games section.
                        </p>
                    </div>

                </div>
            </section>
            <SmallTitle title='PLAY' />

            <div className='flex justify-center pt:12 md:pt-24 align-middle justify-items-center'>
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
            {/* <div>{JSON.stringify(writeError?.message)}</div> */}

            <div className='pt-12'>
                There are {queueSize?.toString()} players in the queue.
                
                
            </div>
            <div className='pt-12'>
                You are in the queue: {inQueue?.toString()}

                
            </div>
            <div className='pt-12'>
      
                Your last game was: {JSON.stringify(lastGame, replacer)}
                
            </div>
            <div className='pt-12'>
                error : {lastGameError?.message}
                
            </div>

            {/* <section className='pt-12 md:pt-24'>
                <SmallTitle title='details' />
            </section>
            <section id='intro' className=' items-center p-12 md:p-18 md:pb-24'>
                <div className='flex'>
                    <div className='justify-right md:w-1/2'></div>
                    <div className='justify-right md:w-1/2 '>
                        <p>
                            This is a multiplayer game of rock-paper-scissors with matchmaking.  
                            This game was deployed using the Tavern game engine without writing any code.
                            <br />
                            <br />
                            First, the game was deployed using the Game Factory.
                            <br />
                            Then, three components were added to the game.
                            <br />
                            Finally, a Flow was created to call functions in order on all the components.
                            <br />
                            <br />
                            The buttons below will execute that created flow, passing in the players address and choice of action.
                            <br />
                            <br />
                            More details about this game can be found in the Games section.
                        </p>
                    </div>

                </div>
            </section> */}

        </section >
    );
}
