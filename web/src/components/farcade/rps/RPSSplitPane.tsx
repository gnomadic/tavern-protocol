'use client';

import useDeployment from "@/hooks/useDeployment";
import { executeFlow } from '@/services/viemService';
import { gameAbi, queueSessionAbi, rewardErc20Abi, rockPaperScissorsAbi, useReadGameFactoryGetGames, useReadPvpResultGetLastGame, useReadQueueSessionGetPlayerCount, useReadQueueSessionIsPlayerInQueue, useWatchQueueSessionJoinedQueueEvent, useWatchRockPaperScissorsGameResultEvent, useWriteGame, useWriteGameExecuteFlow, watchRockPaperScissorsGameResultEvent } from '@/generated';
import { GameFuncParams } from '@/domain/Domain';
import { useAccount, useEnsName, useWaitForTransactionReceipt } from 'wagmi';
import useThrowBall from '@/mutations/useThrowBall';
import { Abi, Address, decodeEventLog, erc20Abi, erc721Abi, zeroAddress } from 'viem';
import SmallTitle from '@/components/base/SmallTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { config } from '@/domain/WagmiConfig';
import { bigIntReplacer, pretty } from '@/domain/utils';
import paper from '@/images/rockpaperscissors/paper.png';
import rock from '@/images/rockpaperscissors/rock.png';
import scissors from '@/images/rockpaperscissors/scissors.png';
import Image from 'next/image';
import RPSAction from './RPSAction';
import RPSResult from './RPSResult';


export default function RPSSplitPane() {
    const { deploy } = useDeployment();
    const { address } = useAccount();

    let actionmap = [
        { num: "0", value: 'choose', image: '/images/rockpaperscissors/rock.png' },
        { num: "1", value: 'rock', image: '/images/rockpaperscissors/rock.png' },
        { num: "2", value: 'paper', image: '/images/rockpaperscissors/paper.png' },
        { num: "3", value: 'scissors', image: '/images/rockpaperscissors/scissors.png' },
    ]

    const [selected, setSelected] = useState<number>(0);


    return (
        <section >
            <div className='flex flex-col gap-8 px-8 py-20 md:px-16 md:flex-row'>
                <div className='border border-white border-dashed basis-1/3'>
                    <RPSAction
                        deploy={deploy}
                        address={address ? address : zeroAddress}
                        actionmap={actionmap}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
                <div className='border border-white border-dashed basis-2/3'>
                    <RPSResult
                        deploy={deploy}
                        address={address ? address : zeroAddress}
                        actionmap={actionmap}
                        selected={selected}
                        
                     />
                </div>

            </div>

        </section >
    );
}
