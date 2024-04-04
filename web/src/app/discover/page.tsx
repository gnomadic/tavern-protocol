'use client';

import Header from '@/components/Header';
import useCurrentGames from '@/hooks/useCurrentGames';
import useCurrentSupply from '@/hooks/useCurrentGames';
import Image from 'next/image';
import { cursorTo } from 'readline';

export default function Discover() {

  const  { curSupply, isCurSupplyError } = useCurrentGames({contractAddress: "0x3eF20038Cca34663DEb65e6F42065C04385616b9", pageStart: 0})
  return (
    <main className='font-anon flex flex-col items-center p-40'>

<section id='hero' className='relative  items-center pt-8'>
          <p> Explore Games that others have deployed </p>
          <p> Explore Modules that others have deployed and you can use for your games </p>


<ul>
{JSON.stringify(curSupply)}
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
