import Divider from '@/components/Divider';
import GameHeader from '@/components/game/GameHeader';

import { Address } from 'viem';
import { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit';

import GameInfo from '@/components/game/GameInfo';


interface Params {
  chainid: string;
  address: string;
}

interface SearchParams {
  action: string;
}

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams
}): Promise<Metadata> {
  const { chainid, address } = params;
  const { action } = searchParams;

  const postURL = `${process.env.NEXT_PUBLIC_URL}/game/${chainid}/${address}/frame?action=${action}`;
  // const gameSummary = await getGameSummary(params.chainid, params.address as Address)
  // console.log(gameSummary)

  // const buttonLabels = gameSummary.availableFunctions.length > 0 ? gameSummary.availableFunctions[0].name : "no modules!"
  const buttonLabels = 'nope';

  return {
    title: 'Tavern Game',
    description: `A Tavern game`,
    openGraph: {
      title: 'playtavern.com',
      description: 'nocode onchain game creation',
      images: ['https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6'],
    },
    other: {
      ...getFrameMetadata({
        buttons: [{
          action: "post",
          label: `${buttonLabels}`,
          target: `${postURL}`
        }],
        image: 'https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6',
      }),
    },
  };
}


export default function Game({ params }: { params: { address: string, chainid: string } }) {
  return (
    <main className='flex flex-col px-24 pt-8 font-anon'>

      <GameHeader gameAddress={params.address as Address} />

      <Divider />

      <GameInfo gameAddress={params.address as Address} />

    </main>
  );
}
