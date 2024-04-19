"use client"
import useBallHolderIndexes from '@/hooks/useBallHolderIndexes';
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useGameSummary from '@/hooks/useGameSummary';
import usePlayerCount from '@/hooks/usePlayerCount';
import useRegisterModule from '@/mutations/useRegisterModule';
import { UserCircleIcon, UserIcon, UserPlusIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserCircleIconOutline, UserPlusIcon as UserPlusIconOutline, UserIcon as UserIconOutline } from '@heroicons/react/24/outline';


import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import useBallCatcherIndexes from '@/hooks/useBallCatcherIndexes';
import usePlayerIndex from '@/hooks/usePlayerIndex';

type PlayersProps = {
    gameAddress: Address
}



export default function Players(props: PlayersProps) {
    const { deploy } = useDeployment();

    const {address} = useAccount();

    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
    const { players, playerCountError } = usePlayerCount({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    // TODO this lookup is rough and hardcoded
    const { holders, ballHoldersError } = useBallHolderIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
    const { catchers, ballCatchersError } = useBallCatcherIndexes({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, gameAddress: props.gameAddress });
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

    return (
        <section>
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
                    {/* {Array.from({ length: 1000}).map((object, i) => { */}
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
