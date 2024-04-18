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
import useJoinGame from '@/mutations/useJoingame';
import useThrowBall from '@/mutations/useThrowBall';
import useCatchBall from '@/mutations/useCatchBall';

type PlayCatchProps = {
    gameAddress: Address

}

export default function PlayCatch(props: PlayCatchProps) {
    const { deploy } = useDeployment();
    const { address } = useAccount();

    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
    const { joinHash, joinError, joinPending, writeJoin } = useJoinGame({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });
    const { throwHash, throwError, throwPending, writeThrow } = useThrowBall({moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address,  player: address! });
    const { catchHash, catchError, catchPending, writeCatch } = useCatchBall({ moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address,  player: address! });

    return (
        <section>
            <div className='flex flex-auto'>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4">
                        Join</button>
                </div>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4">
                        Throw</button>
                </div>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4">
                        Catch</button>
                </div>
            </div>

            <div className='pt-4'>
                If youre not in the game, pretty much only show a join button and maybe number of players and balls in the air on your network
            </div>



            <div className='pt-4'>
                if youre in the game, and you have a ball let you throw it.
            </div>

            <div className='pt-4'>
                if youre in the game, and you dont have a ball, but can intercept let you intercept it
            </div>

            <div className='pt-4'>
                if youre in the game, and you dont have a ball, and cant intercept it, let you watch
            </div>

        </section>
    );
}
