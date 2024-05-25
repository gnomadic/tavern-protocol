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

export default function ExploreGames() {
    const { deploy } = useDeployment();
    const { data: currentGames } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: gameCount } = useReadGameFactoryGetGameCount({ address: deploy.gameFactory })


    return (
        <div className="md:pt-12 pb-24">
            <div className='text-4xl md:text-5xl lg:text-6xl uppercase'>
                {deploy.chain}{'/'}GAMES{'/'}{gameCount ? gameCount.toString() : "..."}
            </div>

            {/* <p> Explore Games that others have deployed on {deploy.chain} </p> */}
            {/* <p> There are {gameCount ? gameCount.toString() : '...'}  </p> */}

            <ul className='pb-24'>

                {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'> */}
                {Array.from({ length: currentGames ? currentGames.length : 0 }).map((object, i) => {
                    if (currentGames![i].game !== '0x0000000000000000000000000000000000000000') {
                        return (
                            <div key={i} className="pt-8">
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
                            </div>
                        );
                    }
                })}
                {/* </div> */}
            </ul>
        </div>

    )
}
