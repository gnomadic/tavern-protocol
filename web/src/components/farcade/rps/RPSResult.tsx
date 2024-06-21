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
import paper from '@/images/rockpaperscissors/paper.png';
import rock from '@/images/rockpaperscissors/rock.png';
import Image from 'next/image';
// import rock from '@/images/rps-rock.png';


export default function RPSResult() {

    const { deploy } = useDeployment();
    const { address } = useAccount();

    // const { data: games, error: gameError } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: queueSize, error: queueError, refetch: refetchQueuePlayers } = useReadQueueSessionGetPlayerCount({ address: deploy.queueComponent, args: [deploy.rpsGame] });
    const { data: inQueue, error: inQueueError, refetch: refetchInQueue } = useReadQueueSessionIsPlayerInQueue({ address: deploy.queueComponent, args: [deploy.rpsGame, address ? address : zeroAddress] });
    // const {data: lastGame, error: lastGameError } = useReadPvpResultGetLastGame({address: deploy.resultComponent, args: [address ? address : zeroAddress, deploy.rpsGame]});
    const { data: lastGame, error: lastGameError, refetch: refetchGetLastGame } = useReadPvpResultGetLastGame({ address: deploy.resultComponent, args: [deploy.rpsGame, address ? address : zeroAddress] });


    const { data: hash, error: writeError, writeContract } = useWriteGame();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

    let actionmap = [
        { num: "0", value: 'not found?' },
        { num: "1", value: 'rock' },
        { num: "2", value: 'paper' },
        { num: "3", value: 'scissors' }
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
        <section className='relative min-h-[500px] px-12 pt-24 md:px-24 ' >
            <section>
                <div className='absolute top-0 left-0 p-5 text-xl text-tavernGreen'>
                    kirox.eth
                </div>
                <div className='absolute bottom-0 right-0 p-5 text-xl text-red'>
                    edwardf.eth
                </div>
                <div className='absolute top-[10%] left-[20%] rotate-45'>
                    <Image
                        src={rock}
                        alt="Rock Paper Scissors"
                        width={200}
                        height={200} />
                </div>
                <div className='absolute bottom-[10%] right-[20%] -rotate-45'>
                    <Image
                        src={paper}
                        alt="Rock Paper Scissors"
                        width={200}
                        height={200} />
                </div>
                <div className='absolute mx-auto text-6xl text-center inset-1/2'>
                    vs
                </div>
            </section>

            <section>
                {/* <SmallTitle title={inQueue ? "Waiting for player" : Number(queueSize) == 0 ? "Join Queue" : "Play now"} /> */}
                {/* 
                {inQueue ? (
                    <div className='pt-12 text-center'>
                        you can use a second wallet to play against yourself if you want to see the experience!
                    </div>
                ) : Number(queueSize) == 0 ? (
                    <div className='pt-12 text-center'>
                        The queue is empty so after you submit your action you&apos;ll have to wait for a match!
                    </div>
                ) : (
                    <div className='pt-12 text-center'>
                        There is someone in the queue waiting so you will play immediately!
                    </div>
                )} */}


            </section>
            <section className='pt-12 md:pt-24'>
                {/* <div>{JSON.stringify(writeError?.message)}</div> */}
                {/* <SmallTitle title='STATUS' />

                {queueSize !== undefined && inQueue !== undefined ? (


                    <div className='pt-12'>
                        {inQueue ? "you are in the queue!  If you want to play, you can use a second account." : Number(queueSize) == 0 ? "the queue is empty, you'll be the first one in it!" : "There is a player waiting for you!"}
                    </div>
                ) : (
                    <div className='pt-12'>
                        Loading Queue Status
                    </div>
                )} */}

                {/* <div className='pt-12'>
                    There are {queueSize?.toString()} players in the queue.


                </div> */}
                {/* <div className='pt-12'>
                    You are in the queue: {inQueue?.toString()}


                </div> */}
                {(lastGame && lastGame.opponent != zeroAddress) ? (<div className='pt-12'>
                    <SmallTitle title="last game" />
                    <div className="pt-12 text-2xl text-center md:pt-24">
                        Your last game was a
                    </div>
                    {/* <div>{JSON.stringify(lastGame, bigIntReplacer)}</div> */}
                    <div className="text-4xl text-center ">
                        {lastGame?.winner == zeroAddress ? "draw" : lastGame?.winner == address ? "win" : "loss"}
                    </div>

                    <div className="grid gap-8 py-8 pt-12 md:grid-cols-2 md:pt-24">
                        <div className="mx-12">
                            <div className="text-lg border-b-2 border-white ">
                                You played
                            </div>
                            <div>
                                {actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                            </div>

                        </div>


                        <div className="mx-12">
                            <div className="text-lg border-b-2 border-white ">
                                your opponent, {pretty(lastGame?.opponent)}, played
                            </div>
                            <div>
                                {actionmap.find((action) => { return action.num === lastGame?.opponentAction.toString() })!.value}
                            </div>

                        </div>



                    </div>

                </div>) : (<></>)}

                {/* <div className='pt-12'>
                    error : {lastGameError?.message}
                    error2: {JSON.stringify(writeError, null, 2)}
                </div> */}
            </section>

            {/* <section className='pt-12 md:pt-24'>
                <SmallTitle title='details' />
            </section>
            <section id='intro' className='items-center p-12 md:p-18 md:pb-24'>
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
