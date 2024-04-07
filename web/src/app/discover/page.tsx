'use client';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModuleCard from '@/components/ModuleCard';
import { GameSummary, ModuleSummary } from '@/domain/Domain';
import useCurrentGames from '@/hooks/useCurrentGames';
import useCurrentSupply from '@/hooks/useCurrentGames';
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useGameCount from '@/hooks/useGameCount';
import useModuleCount from '@/hooks/useModuleCount';
import Image from 'next/image';
import { cursorTo } from 'readline';

export default function Discover() {

  const { deploy } = useDeployment();
  const { gameCount, gameCountError } = useGameCount({ deploy: deploy });
  const { currentGames, currentGamesError } = useCurrentGames({ deploy: deploy, pageStart: 0 })
  const { moduleCount, moduleCountError } = useModuleCount({ deploy: deploy });
  const { currentModules, currentModulesError } = useCurrentModules({ deploy: deploy, pageStart: 0 })

  return (
    <main className='font-anon flex  items-center pt-40 px-24'>

      <section id='hero' className='pt-8'>
        <p> Explore Games that others have deployed on {deploy.chain} </p>

        <p> There are {gameCount}  </p>
        <ul>
          {/* {JSON.stringify(currentGames)} */}
          {/* {curSupply} */}

        </ul>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
          {Array.from({ length: currentGames?.length }).map((object, i) => {
            // {Array.from({ length: currentGames?.length }).map((object, i) => {
            if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
              return (
                <div key={i} className="pt-8">
                  {/* <div>{JSON.stringify(currentGames[i])}</div> */}
                  {/* <Divider /> */}
                  <GameCard
                    // gameSummary={gameSummary(currentGames[i])}
                    gameSummary = {currentGames[i]}
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


        <br />
        <br />
        <br />
        <br />
        <br />
        <p> Explore Modules in the registry that you can use for your games on {deploy.chain}</p>
        <p> There are {moduleCount}  </p>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
          {Array.from({ length: currentModules?.length }).map((object, i) => {
            // {Array.from({ length: currentGames?.length }).map((object, i) => {
            if (currentModules[i].module !== '0x0000000000000000000000000000000000000000') {
              return (
                <div key={i} className="pt-8">

                  <div>{JSON.stringify(currentModules[i])}</div>

                  {/* <Divider /> */}
                  <ModuleCard

                    moduleSummary={currentModules[i] as ModuleSummary}
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
        {/* </section>
      <section id='connect' className='relative -mt-48 items-center'>
    
        <br />
        <p>
          Our mission is to make communities stronger. Everything we do, we try
          to enable and empower existing communites and their members. We also
          believe in the power of play.
          <br />
          <br />
          PLAYMINT is an on-chain game engine made for existing NFTs and their
          communities. Plug in your favorite NFT and launch your own game for your own community
          today.
        </p>
      </section>
      <section>
  */}
      </section>
    </main>
  );
}
