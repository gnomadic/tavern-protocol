import Divider from '@/components/Divider';
import Header from '@/components/game/Header';
import StepThree from '@/components/game/StepThree';

import { Address } from 'viem';
import { Metadata, ResolvingMetadata } from 'next';
import { FrameButtonMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import Players from '@/components/game/Players';


interface Params {
  chainid: string;
  address: string;
}

interface SearchParams {
  action: string;
}

export async function generateMetadata({
  
}: {

}): Promise<Metadata> {

  const postURL = `${process.env.NEXT_PUBLIC_URL}/farcade/rps/frame?action=`;
  const imageURL = `${process.env.NEXT_PUBLIC_URL}/farcade/rps/frame/images?page=one`;


  let rockButton: FrameButtonMetadata =
  {
    action: "post",
    label: "ROCK",
    target: `${postURL}rock`,
  }

    let paperButton: FrameButtonMetadata =
    {
        action: "post",
        label: "PAPER",
        target: `${postURL}paper`,
    }

    let scissorsButton: FrameButtonMetadata =
    {
        action: "post",
        label: "SCISSORS",
        target: `${postURL}scissors`,
    }

    let tavernButton: FrameButtonMetadata =
    {
        action: "link",
        label: "TAVERN",
        target: `https://docs.playtavern.com`,
    }
//   const gameSummary = await getGameSummary(params.chainid, params.address as Address)
  // console.log(gameSummary)

//   const buttonLabels = gameSummary.availableFunctions.length > 0 ? gameSummary.availableFunctions[0].Key : "no modules!"
const buttonLabels = "ROCK";
  return {
    title: 'Rock Paper Scissors ',
    description: `A Tavern game`,
    openGraph: {
      title: 'playtavern.com',
      description: 'nocode onchain game creation',
      images: [`${imageURL}`],
    },
    other: {
      ...getFrameMetadata({
        buttons: [rockButton, paperButton, scissorsButton, tavernButton],
        image: `${imageURL}`,
      }),
    },
  };
}


export default function Game({ params }: { params: { address: string, chainid: string } }) {
  // const verbs = ['play', 'create', 'grow', 'build'];
  // const [activeVerb, setActiveVerb] = useState(verbs[0]);
  // const { deploy } = useDeployment();



  // const { registerEntityHash, registerEntityGameError, registerEntityisPending, writeRegisterEntity } = useRegisterEntity({ contractAddress: params.address as Address });
  // const { isLoading: registerEntityIsConfirming, isSuccess: registerEntityIsConfirmed } = useWaitForTransactionReceipt({ hash: registerModuleHash });
  return (
    <main className='flex flex-col items-center justify-between p-24 font-anon'>
      {/* <section id='connect' className='relative items-center pt-48'>
        <div className='pb-8 text-8xl'>
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
      {/* <section id='connect' className='relative items-center pt-8'>

        <div className='pt-4'>
          Every Game is a collection of Modules and Entities.  Modules contain gameplay, and Entities contain data.
        </div>
        <div className='pt-4'>
          As a developer, it is very straightforward to add new gameplay and features through modules.  This Demo module is 8 lines of code.
        </div>
        <div className='pt-4'>
          As a proof of concept, our UX is terrible right now so bear with us, and follow the steps below.
        </div>
      </section>*/}
       <div className='pt-8'>
        Tavern is a no-code onchain game creation platform.  This demo is Rock Paper Scissors.
      </div>

      <div className='pt-8'>
        This game uses three components:
        <br/>
        <p>1. QueueSession:  This allows players to queue up for a match.</p>
        <p>2. RPS:  This allows a game to define a list of Actions, where each action is beaten by the next action.</p>
        <p>3. RewardERC20:  This rewards a winner (or ties) with a token.</p>
        </div>

      <section className='py-4'>
        <Divider />
      </section>

      <section id='connect' className='relative items-center pt-4'>

        {/* <PlayCatch gameAddress={params.address as Address} /> */}

        {/* <section className='py-20'>
          <Divider />
        </section>
         */}
        <Players 
        gameAddress={params.address as Address} 
        refresh={true}/>


      </section>
      {/* 
      <StepOne gameAddress={params.address as Address} />
      <StepTwo gameAddress={params.address as Address} /> */}
      <StepThree gameAddress={params.address as Address} />

      <section className='py-20'>
        <Divider />
      </section>
  

    </main>
  );
}
