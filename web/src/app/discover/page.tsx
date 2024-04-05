'use client';

import Header from '@/components/Header';
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
    <main className='font-anon flex flex-col items-center p-40'>

      <section id='hero' className='relative  items-center pt-8'>
        <p> Explore Games that others have deployed </p>

        <p> There are {gameCount}  </p>
        <ul>
          {JSON.stringify(currentGames)}
          {/* {curSupply} */}

        </ul>

<br/>
<br/>
<br/>
<br/>
<br/>
        <p> Explore Modules that others have deployed and you can use for your games </p>
        <p> There are {moduleCount} </p>

        <ul>
          {JSON.stringify(currentModules)}
          {/* {curSupply} */}

        </ul>
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
