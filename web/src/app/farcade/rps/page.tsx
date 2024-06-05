import Divider from '@/components/Divider';
import { Metadata, ResolvingMetadata } from 'next';
import PlayRPS from '@/components/farcade/rps/PlayRPS';
import { fetchMetadata } from 'frames.js/next';
import { getBaseUrl } from './frame/frames';

interface Params {
  chainid: string;
  address: string;
}

interface SearchParams {
  action: string;
}

// export const GAME_ADDRESS: Address  = '0xa36F4B4C02D5f583C2747B468730B54D27F7a469';

export async function generateMetadata({

}: {

  }): Promise<Metadata> {

  const postURL = `${process.env.NEXT_PUBLIC_URL}/farcade/rps/frame?action=`;
  const txURL = `${process.env.NEXT_PUBLIC_URL}/farcade/rps/frame/txdata?action=`;
  const imageURL = `${process.env.NEXT_PUBLIC_URL}/farcade/rps/frame/images`;


  // let rockButton: FrameButtonMetadata =
  // {
  //   action: "post",
  //   label: "ROCK",
  //   target: `${postURL}rock&game=${GAME_ADDRESS}`,
  // }

  // let rockButton: FrameButtonMetadata =
  // {
  //   action: "tx",
  //   label: "ROCK",
  //   target: `${txURL}rock`,
  //   postUrl: `${postURL}rock`,
    
    
  // }

  // let paperButton: FrameButtonMetadata =
  // {
  //   action: "post",
  //   label: "PAPER",
  //   target: `${postURL}paper`,
  // }

  // let scissorsButton: FrameButtonMetadata =
  // {
  //   action: "post",
  //   label: "SCISSORS",
  //   target: `${postURL}scissors`,
  // }

  // let tavernButton: FrameButtonMetadata =
  // {
  //   action: "link",
  //   label: "TAVERN",
  //   target: `https://docs.playtavern.com`,
  // }
  //   const gameSummary = await getGameSummary(params.chainid, params.address as Address)
  // console.log(gameSummary)

  //   const buttonLabels = gameSummary.availableFunctions.length > 0 ? gameSummary.availableFunctions[0].Key : "no modules!"
  // const buttonLabels = "ROCK";

  // return {
  //   title: 'Rock Paper Scissors ',
  //   description: `A Tavern game`,
  //   openGraph: {
  //     title: 'playtavern.com',
  //     description: 'nocode onchain game creation',
  //     images: [`${imageURL}`],
  //   },
  //   other: {
  //     ...getFrameMetadata({
  //       buttons: [rockButton, paperButton, scissorsButton, tavernButton],
  //       image: `${imageURL}`,
  //     }),
  //   },
  // };

  return {
    title: "New api example",
    description: "This is a new api example",
    other: {
      ...(await fetchMetadata(
        new URL("/farcade/rps/frame", getBaseUrl())
      )),
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
    <main className='flex flex-col px-24 pt-52 font-anon'>

      {/* <section id='connect' className='relative items-center pt-48'>
      

        
      </section> */}
      {/* <section className='pt-24'>
        <Divider />
      </section> */}
      {/* <GameHeader gameAddress='0xa040245440C7711232C0aB3fA5a62D09bB266818' /> */}
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
      <div className='pt-12'>play </div>
      <div className='pb-8 text-8xl'>
        Rock Paper Scissors
      </div>
      <div>
      </div>
      <div className='pt-8'>
        Built with Tavern, this game showcases the power of community creation. Anyone could have designed it by selecting gameplay elements (Components) and defining how they interact (Flows) through simple transactions. Tavern enables on-chain game creation for everyone.
      </div>

      <section className='py-4'>
        <Divider />
      </section>

      <div className=''>
        This game uses three Components and has one Flow, playRPS:
      
        <p className='py-3'>1.  Call `setMatchOrWait` on the QueueSession.  This will establish player1 and player2, or, wait until there are 2 players.</p>
        <p className='py-3'>2.  Call `oneOnOne` on RPS.  This will load player1 and player2 provided by the QueueSession.  This will establish a winner or two addresses in a tie.</p>
        <p className='py-3'>3.  Call `rewardWinner` on RewardERC20.  This will load the winner (or ties) and reward them with a token.</p>
      </div>

      <section className='py-4'>
        <Divider />
      </section>
      <PlayRPS />
      {/* <div className='pb-8 text-4xl'>
        Try it out on
      </div>
      <div className='flex justify-center pt-4 align-middle justify-items-center'>
        <div className='mx-auto'>
          <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'>
            ROCK
          </button>
        </div>
        <div className='mx-auto'>
          <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'>
            PAPER
          </button>
        </div>
        <div className='mx-auto'>
          <button className='justify-center px-12 py-4 border-2 border-gray-300 rounded-md bg-slate-800'>
            SCISSORS
          </button>
        </div>
      </div> */}





    </main>
  );
}
