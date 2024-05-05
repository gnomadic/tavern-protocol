'use client';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModuleCard from '@/components/ModuleCard';
import DiscoverModules from '@/components/explore/ExploreComponents';
import { GameSummary, ComponentSummary } from '@/domain/Domain';
import { useReadComponentRegistryGetModuleCount, useReadComponentRegistryGetModules, useReadGameFactoryGetGameCount, useReadGameFactoryGetGames } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ExploreGames() {
    const { deploy } = useDeployment();
    const { data: currentGames } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: gameCount } = useReadGameFactoryGetGameCount({ address: deploy.gameFactory })
        
    return (
        <div className="pt-12">
            <p> Explore Games that others have deployed on {deploy.chain} </p>

            <p> There are {gameCount ? gameCount.toString() : 0}  </p>
            <ul>
                {/* {JSON.stringify(currentGames)} */}
                {/* {curSupply} */}

            </ul>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
                {Array.from({ length: currentGames ? currentGames.length : 0 }).map((object, i) => {
                    // {Array.from({ length: currentGames?.length }).map((object, i) => {
                    if (currentGames![i].game !== '0x0000000000000000000000000000000000000000') {
                        return (
                            <div key={i} className="pt-8">
                                {/* <div>{JSON.stringify(currentGames[i])}</div> */}
                                {/* <Divider /> */}
                                <GameCard
                                    // gameSummary={gameSummary(currentGames[i])}
                                    gameSummary={currentGames![i]}
                                    deployment={deploy}

                                // currentGames[i] as GameSummary}
                                // gameSummary=currentGames[i]
                                // deploy={props.deploy}
                                // id={NFTids[i]}
                                // address={props.address}
                                // onClick={(curImage: string | StaticImageData) => {
                                //   handleViewerClick(curImage);
                                // }}
                                />
                            </div>
                        );
                    }
                })}
            </div>
        </div>

    )
}
