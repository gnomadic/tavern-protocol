'use client';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModuleCard from '@/components/ModuleCard';
import { GameSummary, ComponentSummary } from '@/domain/Domain';
import { useReadComponentRegistryGetModuleCount, useReadComponentRegistryGetModules, useReadGameFactoryGetGameCount, useReadGameFactoryGetGames } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Discover() {

  const { deploy } = useDeployment();
  // const { gameCount, gameCountError } = useGameCount({ deploy: deploy });
  // const { currentGames, currentGamesError } = useCurrentGames({ deploy: deploy, pageStart: 0 })
  // const { moduleCount, moduleCountError } = useModuleCount({ deploy: deploy });
  // const { currentModules, currentModulesError } = useCurrentModules({ deploy: deploy, pageStart: 0 })
  const { data: currentModules } = useReadComponentRegistryGetModules({ address: deploy.moduleRegistry, args: [0] })
  const { data: currentGames } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
  const { data: gameCount } = useReadGameFactoryGetGameCount({ address: deploy.gameFactory })
  const { data: moduleCount } = useReadComponentRegistryGetModuleCount({ address: deploy.moduleRegistry })

  return (
    <main className='items-center px-24 pt-40 font-anon'>


      <Tabs>
        <TabList>
          <Tab>Games</Tab>
          <Tab>Components</Tab>
        </TabList>

        <TabPanel>
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
            </div></div>
        </TabPanel>
        <TabPanel>
          <div className="pt-12">
            <p> Explore Modules in the registry that you can use for your games on {deploy.chain}</p>
            <p> There are {moduleCount ? moduleCount.toString() : 0}  </p>


            <div className='grid grid-cols-1 gap-4 pb-12 md:grid-cols-2 lg:grid-cols-2'>
              {Array.from({ length: currentModules ? currentModules.length : 0 }).map((object, i) => {
                // {Array.from({ length: currentGames?.length }).map((object, i) => {
                if (currentModules![i].component !== '0x0000000000000000000000000000000000000000') {
                  return (
                    <div key={i} className="pt-8">

                      {/* <div>{JSON.stringify(currentModules[i])}</div> */}

                      {/* <Divider /> */}
                      {/* {console.log('currentModules[i]', currentModules[i])} */}
                      <ModuleCard
                        displayName={currentModules![i].displayName}
                        address={currentModules![i].component}
                        functions={currentModules![i].functions}

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
        </TabPanel>
      </Tabs>

    </main>
  );
}
