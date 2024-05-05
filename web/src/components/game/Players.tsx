"use client"
import useBallHolderIndexes from '@/hooks/useBallHolderIndexes';
import useDeployment from '@/hooks/useDeployment';
import useGameSummary from '@/hooks/useGameSummary';
import usePlayerCount from '@/hooks/usePlayerCount';
import { UserCircleIcon, UserIcon, UserPlusIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserCircleIconOutline, UserPlusIcon as UserPlusIconOutline, UserIcon as UserIconOutline } from '@heroicons/react/24/outline';
import useThrowBall from '@/mutations/useThrowBall';
import useCatchBall from '@/mutations/useCatchBall';

import { Address } from 'viem';
import { BaseError, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import useBallCatcherIndexes from '@/hooks/useBallCatcherIndexes';
import usePlayerIndex from '@/hooks/usePlayerIndex';
import { useEffect } from 'react';
import Divider from '../Divider';
// import { useReadMmoNeighborInteractionModuleGetBallHolderIndexes, useReadMmoNeighborInteractionModuleGetCatchableIndexes, useReadMmoNeighborInteractionModuleGetPlayerCount, useWriteGameExecuteFlow } from '@/generated';
import { safeBigInt } from '@/domain/utils';
import { GameFuncParams } from '@/domain/Domain';

type PlayersProps = {
    gameAddress: Address
    refresh: boolean
}



export default function Players(props: PlayersProps) {



    const { deploy } = useDeployment();
    const { address } = useAccount();
    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

    const { throwHash, throwError, throwPending, throwSuccess, writeThrow } = useThrowBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerCount") return element })?.value as Address, player: address! });
    const { catchHash, catchError, catchPending, catchSuccess, writeCatch } = useCatchBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerCount") return element })?.value as Address, player: address! });
    // const { result: holders, error: holderError, refetch: holderRefresh } = useBallHolderIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    // const { result: catchers, error: catcherError, refetch: catcherRefresh } = useBallCatcherIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    const { player, playerIndexError } = usePlayerIndex({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerIndex") return element })?.value as Address, gameAddress: props.gameAddress, playerAddress: address! });

    // TODO this lookup is rough and hardcoded
    // const { data: players, refetch: playerCountRefetch } = useReadMmoNeighborInteractionModuleGetPlayerCount({ address: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerCount") return element })?.value as Address, args: [props.gameAddress] })
    // const { data: holders, refetch: holderRefetch } = useReadMmoNeighborInteractionModuleGetBallHolderIndexes({ address: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerCount") return element })?.value as Address, args: [props.gameAddress] })
    // const { data: catchers, refetch: catcherRefetch } = useReadMmoNeighborInteractionModuleGetCatchableIndexes({ address: gameSummary?.availableFunctions.find((element) => { if (element.name == "getPlayerCount") return element })?.value as Address, args: [props.gameAddress] })



    // // const { data: joinhash, writeContract: joinWrite, error: joinError } = useWriteGameExecuteFlow();
    // const { isLoading: joinLoading, isSuccess: joinSuccess } = useWaitForTransactionReceipt({ hash: joinhash });


    // const getIcon = (index: BigInt) => {
    //     const isCatcher = catchers!.findIndex((element) => { element.x === index }) >= 0
    //     const isHolder = holders!.findIndex((element) => { element.x === index }) >= 0
    //     const isPlayer = index === BigInt(player) && index !== BigInt(0);
    //     const fill = isPlayer ? 'fill-blue-400' : '';

    //     if (isCatcher && isHolder) return <UserPlusIcon className={'mx-4 my-1 h-4 w-4 ' + fill} />
    //     if (isCatcher) return <UserPlusIconOutline className={'mx-4 my-1 h-4 w-4 ' + fill} />
    //     if (isHolder) return <UserCircleIcon className={'mx-4 my-1 h-4 w-4 ' + fill} />
    //     return <UserIconOutline className={'mx-4 my-1 h-4 w-4 ' + fill} />
    // }

    // useEffect(() => {
    //     if (catchSuccess || throwSuccess || joinSuccess) {
    //         catcherRefetch()
    //         holderRefetch()
    //         playerCountRefetch()
    //     }

    // }, [props.refresh, playerCountRefetch, holderRefetch, catcherRefetch, catchSuccess, throwSuccess, joinSuccess])



    return (
        <section>
            <section>
                <div className='pt-8'>
                    HOW TO PLAY THIS DEMO:
                    <br />
                    <p>1.  Use two wallets, and join the game twice.  You will have to refresh the page for now after Joining.</p>
                    <p>2.  One of your wallets will start with a ball, which you can throw</p>
                    <p>3.  Once the ball is thrown, switch wallets, and you can catch it</p>
                </div>
                <div className='flex flex-auto'>
                    {/* {BigInt(player) == BigInt(0) ?
                        <div className='pt-4 mx-auto'>
                            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                                disabled={joinLoading}
                                onClick={() => {
                                    // writeJoin()

                                    const params: GameFuncParams = {
                                        addresses: [{ name: "player", value: address! }],
                                        uints: [],
                                        strings: []
                                    }
                                    joinWrite({
                                        address: props.gameAddress,
                                        args: ["joinCatch", params]

                                    });


                                }}
                            >
                                {joinSuccess ? `Joined` : joinLoading ? 'Confirming...' : joinError ? `Error!` : `Join`}
                            </button>
                        </div>
                        : <></>} */}

                    {BigInt(player) != BigInt(0) ?

                        <div className='pt-4 mx-auto'>
                            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                                disabled={throwPending && !throwSuccess}
                                onClick={() => {
                                    writeThrow()
                                }}
                            >
                                {throwSuccess ? `Thrown` : throwPending ? 'Confirming...' : throwError ? `Error!` : `Throw`}
                            </button>
                            <div>{JSON.stringify(throwError)}</div>
                        </div>
                        : <></>}
                    {BigInt(player) != BigInt(0) ?
                        <div className='pt-4 mx-auto'>
                            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                                disabled={catchPending && !catchSuccess}
                                onClick={() => {
                                    writeCatch()
                                }}
                            >
                                {catchSuccess ? `Caught` : catchPending ? 'Confirming...' : catchError ? `Error!` : `Catch`}
                            </button>
                            <div>{JSON.stringify(catchError)}</div>
                        </div>
                        : <></>}

                </div>
            </section>

            <section className='py-20'>
                <Divider />
            </section>

            {/* <div className='py-8'>
                <div className='flex mx-auto'>
                    <UserIconOutline className='w-4 h-4 mx-4 my-1' />
                    {Number(players) > 0 ? (<div>{safeBigInt(players)} Players</div>) : (<div>No Players</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserCircleIcon className='w-4 h-4 mx-4 my-1' />
                    {holders && holders.length > 0 ? (<div>{holders.length} holders</div>) : (<div>No holders</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserPlusIconOutline className='w-4 h-4 mx-4 my-1' />
                    {catchers && catchers.length > 0 ? (<div>{catchers.length} catchers</div>) : (<div>No balls in the air for people to catch</div>)}
                </div>
                <div className='flex mx-auto'>
                    {(BigInt(player) == BigInt(0)) ? <UserIcon className='w-4 h-4 mx-4 my-1 fill-red-400' /> : getIcon(BigInt(player))}
                    <div>you</div>
                </div>

                <div className="grid grid-cols-[repeat(15,_minmax(0,_1fr))] md:grid-cols-[repeat(25,_minmax(0,_1fr))] lg:grid-cols-[repeat(50,_minmax(0,_1fr))]">
                    {Array.from({ length: Number(players) }).map((object, i) => {
                        return (
                            <div key={i} className=''>
                                {getIcon(BigInt(i))}

                            </div>
                        );
                    })}
                </div>

            </div> */}

        </section>
    );
}
