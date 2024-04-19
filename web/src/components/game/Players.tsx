"use client"
import useBallHolderIndexes from '@/hooks/useBallHolderIndexes';
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useGameSummary from '@/hooks/useGameSummary';
import usePlayerCount from '@/hooks/usePlayerCount';
import useRegisterModule from '@/mutations/useRegisterModule';
import { UserCircleIcon, UserIcon, UserPlusIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserCircleIconOutline, UserPlusIcon as UserPlusIconOutline, UserIcon as UserIconOutline } from '@heroicons/react/24/outline';
import useJoinGame from '@/mutations/useJoinGame';
import useThrowBall from '@/mutations/useThrowBall';
import useCatchBall from '@/mutations/useCatchBall';

import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import useBallCatcherIndexes from '@/hooks/useBallCatcherIndexes';
import usePlayerIndex from '@/hooks/usePlayerIndex';
import { useEffect } from 'react';
import Divider from '../Divider';

type PlayersProps = {
    gameAddress: Address
    refresh: boolean
}



export default function Players(props: PlayersProps) {



    const { deploy } = useDeployment();
    const { address } = useAccount();
    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

    const { joinHash, joinError, joinPending, joinSuccess, writeJoin } = useJoinGame({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });
    const { throwHash, throwError, throwPending, throwSuccess, writeThrow } = useThrowBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });
    const { catchHash, catchError, catchPending, catchSuccess, writeCatch } = useCatchBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });

    const { result: players, error: playerCountError, refetch: playerCountRefetch } = usePlayerCount({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    // TODO this lookup is rough and hardcoded
    const { result: holders, error: holderError, refetch: holderRefresh } = useBallHolderIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    const { result: catchers, error: catcherError, refetch: catcherRefresh } = useBallCatcherIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    const { player, playerIndexError } = usePlayerIndex({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerIndex") return element })?.Address as Address, gameAddress: props.gameAddress, playerAddress: address! });
    const getIcon = (index: BigInt) => {
        const isCatcher = catchers.includes(index);
        const isHolder = holders.includes(index);
        const isPlayer = index === BigInt(player) && index !== BigInt(0);
        const fill = isPlayer ? 'fill-blue-400' : '';

        if (isCatcher && isHolder) return <UserPlusIcon className={'mx-4 my-1 h-4 w-4 ' + fill} />
        if (isCatcher) return <UserPlusIconOutline className={'mx-4 my-1 h-4 w-4 ' + fill} />
        if (isHolder) return <UserCircleIcon className={'mx-4 my-1 h-4 w-4 ' + fill} />
        return <UserIconOutline className={'mx-4 my-1 h-4 w-4 ' + fill} />
    }

    useEffect(() => {
        if (catchSuccess || throwSuccess || joinSuccess) {
            catcherRefresh()
            holderRefresh()
            playerCountRefetch()
        }

    }, [props.refresh, playerCountRefetch, holderRefresh, catcherRefresh, catchSuccess, throwSuccess, joinSuccess])



    return (
        <section>
            <section>
                <div className='pt-8'>
                    HOW TO PLAY THIS DEMO:
                    <br />
                    <p>1.  Use two wallets, and join the game twice.  You'll have to refresh the page for now after Joining.</p>
                    <p>2.  One of your wallets will start with a ball, which you can throw</p>
                    <p>3.  Once the ball is thrown, switch wallets, and you can catch it</p>
                </div>
                <div className='flex flex-auto'>
                    {BigInt(player) == BigInt(0) ?
                        <div className='pt-4 mx-auto'>
                            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                                disabled={joinPending}
                                onClick={() => {
                                    writeJoin()
                                }}
                            >
                                {joinSuccess ? `Joined` : joinPending ? 'Confirming...' : joinError ? `Error!` : `Join`}
                            </button>
                            <div>{JSON.stringify(joinError)}</div>
                        </div>
                        : <></>}

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

            <button onClick={() => {
                playerCountRefetch()
                holderRefresh()
                catcherRefresh()

            }}>refetch</button>
            <div className='py-8'>
                <div className='flex mx-auto'>
                    <UserIconOutline className='mx-4 my-1 h-4 w-4' />
                    {Number(players) > 0 ? (<div>{players} Players</div>) : (<div>No Players</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserCircleIcon className='mx-4 my-1 h-4 w-4' />
                    {holders?.length > 0 ? (<div>{holders.length} holders</div>) : (<div>No holders</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserPlusIconOutline className='mx-4 my-1 h-4 w-4' />
                    {catchers?.length > 0 ? (<div>{catchers.length} catchers</div>) : (<div>No balls in the air for people to catch</div>)}
                </div>
                <div className='flex mx-auto'>
                    {(BigInt(player) == BigInt(0)) ? <UserIcon className='mx-4 my-1 h-4 w-4 fill-red-400' /> : getIcon(BigInt(player))}
                    <div>you</div>
                </div>

                <div className="grid grid-cols-[repeat(15,_minmax(0,_1fr))] md:grid-cols-[repeat(25,_minmax(0,_1fr))] lg:grid-cols-[repeat(50,_minmax(0,_1fr))]">
                    {Array.from({ length: Number(players) }).map((object, i) => {
                        {/* {Array.from({ length: 1000}).map((object, i) => { */ }
                        return (
                            <div key={i} className=''>
                                {getIcon(BigInt(i))}
                                {/* {(holders.includes(BigInt(i)))
                                    ? <UserCircleIcon className='mx-4 my-4 h-4 w-4' />
                                    : <UserCircleIconOutline className='mx-4 my-4 h-4 w-4' />} */}
                            </div>
                        );
                    })}
                </div>

            </div>

        </section>
    );
}
