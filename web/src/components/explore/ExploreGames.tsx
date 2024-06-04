'use client';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModuleCard from '@/components/ModuleCard';
import DiscoverModules from '@/components/explore/ExploreComponents';
import { GameSummary, ComponentSummary } from '@/domain/Domain';
import { useReadGameFactoryGetGameCount, useReadGameFactoryGetGames } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import Image from 'next/image';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { useConfig } from 'wagmi'


export default function ExploreGames() {
    const { deploy } = useDeployment();
    const { data: currentGames, error: curError } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: gameCount, error: countError } = useReadGameFactoryGetGameCount({ address: deploy.gameFactory })

    const { chain } = useAccount()
    const config = useConfig()

    useEffect(() => {
        if (curError) {
            toast.error(curError.message);
        }
        if (countError) {
            toast.error(countError.message);
        }
    }, [curError, countError]);

    return (
        <div className="px-6 md:px-24 pt-12">
            <div className='text-center text-2xl md:text-5xl border-b-2 border-t-2 border-white py-2 uppercase'>
                {deploy.chain}{'/'}GAMES{'/'}{gameCount ? gameCount.toString() : "..."}
            </div>

            {/* <div>{JSON.stringify(error)}</div> */}
            {/* <div>chain: {JSON.stringify(chain)}</div> */}
            {/* <div>config: {JSON.stringify(config)}</div> */}



            <ul className='pb-24 pt-12'>

                {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'> */}
                {Array.from({ length: currentGames ? currentGames.length : 0 }).map((object, i) => {
                    if (currentGames![i].game !== '0x0000000000000000000000000000000000000000') {
                        return (
                            <li key={i} className="pt-8 pb-8">
                                {/* {JSON.stringify(currentGames![i])} */}
                                <GameCard
                                    // gameSummary={currentGames![i]}
                                    index={i}
                                    deployment={deploy}
                                    // displayName={currentGames![i].displayName}
                                    gm={currentGames![i].gm}
                                    metadata={currentGames![i].metadata}
                                    // description={currentGames![i].description}
                                    address={currentGames![i].game}
                                />
                            </li>
                        );
                    }
                })}
                {/* </div> */}
            </ul>
        </div>

    )
}
