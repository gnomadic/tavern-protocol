import Divider from '@/components/Divider';

import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mint Eligibility Checker',
    description: 'MINT',
    openGraph: {
      title: 'mintit.gg',
      description: 'MINT',
      images: ['https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6'],
    },
    other: {
      ...getFrameMetadata({
          buttons: [{
            action: "post",
            label: "say hi",
            target: "url"
          }],
          image: 'https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6',
          post_url: 'https://playmint.app/frames',
          
      }),
    },
  };

export default function Frames() {


    
 

  return (
    <main className='font-anon flex min-h-screen flex-col items-center justify-between p-24'>
      <section id='hero' className='relative min-h-screen items-center pt-48'>
        <p className=''>Use Farcaster Frames as the UI for your game</p>
        <p className='pt-8'>We autogenerate the frames.</p>
        <p className='pt-8'>
          Launch codeless games onchain for your favorite NFT communities with
          PLAYMINT.
        </p>
      </section>
      <section>
        <Divider />
      </section>
    </main>
  );
}
