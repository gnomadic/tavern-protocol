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
import useJoinGame from '@/mutations/useJoinGame';
import useThrowBall from '@/mutations/useThrowBall';
import useCatchBall from '@/mutations/useCatchBall';
import { error } from 'console';

type PlayCatchProps = {
    gameAddress: Address

}



export default function PlayCatch(props: PlayCatchProps) {
    const { deploy } = useDeployment();
    const { address } = useAccount();

    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
    const { joinHash, joinError, joinPending, writeJoin } = useJoinGame({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });
    const { throwHash, throwError, throwPending, writeThrow } = useThrowBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });
    const { catchHash, catchError, catchPending, writeCatch } = useCatchBall({ game: props.gameAddress, moduleAddress: gameSummary?.availableFunctions.find((element) => { if (element.Key == "getPlayerCount") return element })?.Address as Address, player: address! });

    return (
        <section>
            <div className='flex flex-auto'>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                        disabled={joinPending}
                        onClick={() => {
                            writeJoin()

                        }}
                    >
                        {joinPending ? 'Confirming...' : joinError ? `Error!` : `Join`}



                    </button>
                    <div>{JSON.stringify(joinError)}</div>



                </div>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                        disabled={throwPending}
                        onClick={() => {
                            writeThrow()

                        }}
                    >
                        {throwPending ? 'Confirming...' : throwError ? `Error!` : `Throw`}



                    </button>
                    <div>{JSON.stringify(throwError)}</div>

                </div>
                <div className='pt-4 mx-auto'>
                    <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
                        disabled={catchPending}
                        onClick={() => {
                            writeCatch()

                        }}
                    >
                        {catchPending ? 'Confirming...' : catchError ? `Error!` : `Catch`}



                    </button>
                    <div>{JSON.stringify(catchError)}</div>

                </div>
            </div>



        </section>
    );
}
