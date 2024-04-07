import Divider from '@/components/Divider';
import Header from '@/components/game/Header';
import StepOne from '@/components/game/StepOne';
import StepThree from '@/components/game/StepThree';
import StepTwo from '@/components/game/StepTwo';
import { Address } from 'viem';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from "next/headers";
import { getFrameMetadata } from '@coinbase/onchainkit';

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
  const postURL = "https://playmint-git-frames-gnomadics-projects.vercel.app/game/11155111/0xd362776F706b8E72525e3291e5433A695ECBefA7/frame?action=hi";

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


export default function Game({ params }: { params: { address: string } }) {
  // const verbs = ['play', 'create', 'grow', 'build'];
  // const [activeVerb, setActiveVerb] = useState(verbs[0]);
  // const { deploy } = useDeployment();



  // const { registerEntityHash, registerEntityGameError, registerEntityisPending, writeRegisterEntity } = useRegisterEntity({ contractAddress: params.address as Address });
  // const { isLoading: registerEntityIsConfirming, isSuccess: registerEntityIsConfirmed } = useWaitForTransactionReceipt({ hash: registerModuleHash });

  return (
    <main className='font-anon flex flex-col items-center justify-between p-24'>
      {/* <section id='connect' className='relative pt-48 items-center'>
        <div className='text-8xl pb-8'>
          {gameSummary ? gameSummary.displayName : "loading"}
        </div>
        <div>
          game master: {gameSummary ? pretty(gameSummary.gm as Address) : "loading"}
        </div>

        
      </section> */}
      {/* <section className='pt-24'>
        <Divider />
      </section> */}
      <Header gameAddress={params.address as Address} />
      <section id='connect' className='relative pt-8 items-center'>

        <div className='pt-4'>
          Every Game is a collection of Modules and Entities.  Modules contain gameplay, and Entities contain data.
        </div>
        <div className='pt-4'>
          As a developer, it is very straightforward to add new gameplay and features through modules.  This Demo module is 8 lines of code.
        </div>
        <div className='pt-4'>
          As a proof of concept, our UX is terrible right now so bear with us, and follow the steps below.
        </div>
      </section>

      <section className='py-20'>
        <Divider />
      </section>
      <StepOne gameAddress={params.address as Address} />
      <StepTwo gameAddress={params.address as Address} />
      <StepThree gameAddress={params.address as Address} />
      {/* <div className='pt-12'>
          Step 1: First, we choose the gameplay modules we want in our game.  There is a public registry, and right now only one available module.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={registerModuleisPending || !currentModules}
            onClick={() => {
              writeRegisterModule(currentModules[0].module)

            }}
          >
            {registerModuleisPending ? 'Confirming...' : `Register Module`}
          </button>

          {registerModuleHash && <div>Transaction Hash: {registerModuleHash}</div>}
          {registerModuleIsConfirming && <div>Waiting for confirmation...</div>}
          {registerModuleIsConfirmed && <div>Transaction confirmed.</div>}
          {registerModuleGameError && (
            <div>Error: {(registerModuleGameError as BaseError).shortMessage || registerModuleGameError.message}</div>
          )}
        </div> */}

      {/* 
        <div className='pt-36'>
          Step 2: Next, we create an entity and associate it with an NFT.  This button is uses the D7 NFT but any NFT will work.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={createEntityisPending}
            onClick={() => {
              writeCreateEntityToChain(params.address as Address, "simple entity", "0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A")

            }}
          >
            {createEntityisPending ? 'Confirming...' : `create Entity`}
          </button>

          {createEntityHash && <div>Transaction Hash: {createEntityHash}</div>}
          {createEntityIsConfirming && <div>Waiting for confirmation...</div>}
          {createEntityIsConfirmed && <div>Transaction confirmed.</div>}
          {createEntityError && (
            <div>Error: {(createEntityError as BaseError).shortMessage || createEntityError.message}</div>
          )}
        </div> */}


      {/* <div className='pt-36'>
          Step 3: Register the Entity with your game.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={registerModuleisPending || !currentModules}
            onClick={() => {
              writeRegisterEntity(currentModules[0].module)

            }}
          >
            {registerModuleisPending ? 'Confirming...' : `Register Module`}
          </button>
        
        {registerModuleHash && <div>Transaction Hash: {registerModuleHash}</div>}
        {registerModuleIsConfirming && <div>Waiting for confirmation...</div>}
        {registerModuleIsConfirmed && <div>Transaction confirmed.</div>}
        {registerModuleGameError && (
          <div>Error: {(registerModuleGameError as BaseError).shortMessage || registerModuleGameError.message}</div>
        )}
        </div> */}





      {/* <div className='pt-36'>
        Step 3: All set!  Once those two transactions are done, you can reload the page!
      </div>
      <section className='pt-24'>
        <Divider />
      </section>
      <div> Your Game is at: {gameSummary?.game} </div>
      <div className='pt-4'> Your game offers the following functions at the following addresses: </div>
      <ul>
        {Array.from({ length: gameSummary?.availableFunctions.length }).map((object: any, i) => {
          return <li className='pt-2' key={i}>
            <p>address:  {gameSummary.availableFunctions[i].Address}</p>
            <p>function Name:  {gameSummary.availableFunctions[i].Key}</p>
          </li>

        })}
      </ul>

      <div className='pt-4'> Your game offers the following character stats at the following addresses:</div>
      <ul>
        {Array.from({ length: gameSummary?.availableData.length }).map((object: any, i) => {
          return <li className='pt-2' key={i}>
            <p>address:  {gameSummary.availableData[i].Address}</p>
            <p>function Name:  {gameSummary.availableData[i].Key}</p>
          </li>

        })}
      </ul> */}

      {/* <div className='pt-24 mx-4'>{JSON.stringify(gameSummary, null, 2)}</div> */}

    </main>
  );
}
