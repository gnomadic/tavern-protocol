import Divider from '@/components/Divider';

import { getFrameMetadata } from '@coinbase/onchainkit';
import { Address } from 'viem';



// export const metadata: Metadata = {
//   title: 'PLAYMINT GAME FRAME',
//   description: `A Farcaster Frame generated for a PLAYMINT game`,
//   openGraph: {
//       title: 'mintit.gg',
//       description: 'MINT',
//       images: ['https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6'],
//     },
//     other: {
//       ...getFrameMetadata({
//           buttons: [{
//             action: "post",
//             label: "say hi",
//             target: "url"
//           }],
//           image: 'https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6',
//           post_url: 'https://playmint-git-frames-gnomadics-projects.vercel.app/frames/api',

//       }),
//     },
//   };


//   type Props = {
//     params: { id: string, gameAddress: Address }
//     searchParams: { [key: string]: string | string[] | undefined }
//   }

//   export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent: ResolvingMetadata
//   ): Promise<Metadata> {
//     // read route params
//     const id = params.id

//     // fetch data
//     const product = await fetch(`https://.../${id}`).then((res) => res.json())

//     // optionally access and extend (rather than replace) parent metadata
//     const previousImages = (await parent).openGraph?.images || []

//     // return {
//     //   title: product.title,
//     //   openGraph: {
//     //     images: ['/some-specific-page-image.jpg', ...previousImages],
//     //   },
//     // }

//     return {
//       title: 'PLAYMINT GAME FRAME',
//       description: `A Farcaster Frame generated for the game deployed at ${params.gameAddress}`,
//       openGraph: {
//         title: 'PLAYMINT game',
//         description: 'Play a game',
//         images: ['https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6'],
//       },
//       other: {
//         ...getFrameMetadata({
//             buttons: [{
//               action: "post",
//               label: "say hi",
//               target: "url"
//             }],
//             image: 'https://ipfs.io/ipfs/QmSxZqKhHjEUM1iemXrMJsmwwMy8jZ8yx2zSajE3D7ReY6',
//             post_url: 'https://playmint-git-frames-gnomadics-projects.vercel.app/frames/api',

//         }),
//       },
//     }
//   }

import { Metadata, ResolvingMetadata } from 'next';
import { headers } from "next/headers";
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
  const headersList = headers();

  //https://playmint-git-frames-gnomadics-projects.vercel.app/frames/api
  const postURL = "";

  return {
    title: 'PLAYMINT GAME FRAME',
    description: `A Farcaster Frame generated for a PLAYMINT game`,
    openGraph: {
      title: 'playmint.app',
      description: 'nocode onchain game creation',
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
        post_url: `${postURL}`,

      }),
    },
  };
}

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
