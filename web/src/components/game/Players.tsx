"use client"
import useBallHolderIndexes from '@/hooks/useBallHolderIndexes';
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useGameSummary from '@/hooks/useGameSummary';
import usePlayerCount from '@/hooks/usePlayerCount';
import useRegisterModule from '@/mutations/useRegisterModule';
import { UserCircleIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserCircleIconOutline } from '@heroicons/react/24/outline';

import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import useBallCatcherIndexes from '@/hooks/useBallCatcherIndexes';

type PlayersProps = {
    gameAddress: Address
}

export default function Players(props: PlayersProps) {
    const { deploy } = useDeployment();

    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
    const { players, playerCountError } = usePlayerCount({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    // TODO this lookup is rough and hardcoded
    const { holders, ballHoldersError } = useBallHolderIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    const { catchers, ballCatchersError } = useBallCatcherIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });

    return (
        <section>
            <div className='py-8'>
                <div className='flex mx-auto'>
                    <UserCircleIconOutline className='mx-4 my-1 h-4 w-4' />
                    {Number(players) > 0 ? (<div>{players} Players</div>) : (<div>No Players</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserCircleIcon className='mx-4 my-1 h-4 w-4' />
                    {holders?.length > 0 ? (<div>{holders.length} holders</div>) : (<div>No holders</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserCircleIcon className='mx-4 my-1 h-4 w-4 fill-green-600' />
                    {catchers?.length > 0 ? (<div>{holders.length} catchers</div>) : (<div>No balls in the air for people to catch</div>)}
                </div>
                <div className='flex mx-auto'>
                    <UserCircleIcon className='mx-4 my-1 h-4 w-4 fill-blue-400' />
                    <div>you</div>
                </div>

                <div className="grid grid-cols-[repeat(50,_minmax(0,_1fr))]">
                    {Array.from({ length: Number(players) }).map((object, i) => {
                        return (
                            <div key={i} className=''>
                                {(holders.includes(BigInt(i)))
                                    ? <UserCircleIcon className='mx-4 my-4 h-4 w-4' />
                                    : <UserCircleIconOutline className='mx-4 my-4 h-4 w-4' />}
                            </div>
                        );
                    })}
                </div>

            </div>

        </section>
    );
}
