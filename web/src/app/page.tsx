import Divider from '@/components/Divider';
import BigTitle from '@/components/base/BigTitle';
import SmallTitle from '@/components/base/SmallTitle';
import GamePitchCard from '@/components/landing/GamePitchCard';
import GameCard from '@/components/landing/GamePitchCard';
import StepCard from '@/components/landing/StepCard';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

export default function Home() {

  return (
    <main className='items-center py-12 md:py-24 font-anon'>
      <section className='pt-36 min-w-full'>
        <BigTitle title='tavern' />
      </section>
      <section id='intro' className=' items-center pt-24 px-12 md:p-24'>
        <div className='flex'>
          <div className='justify-right md:w-1/2'></div>
          <div className='justify-right md:w-1/2 '>
            <p>
              We believe playing together fosters stronger connections through shared experiences.
              Everything we do, we try
              to enable and empower existing communities and their members. We just
              believe in the power of play.
              <br />
              <br />
              Tavern is an on-chain game engine made for existing web3
              communities. Launch your own game for your own community
              today by submitting transactions, without writing any code.
            </p>
          </div>

        </div>
      </section>

      <section className='px-12 py-24 md:p-24'>
        <SmallTitle title='3 transactions' />
        <div className="grid grid-cols-1 gap-20 md:grid-cols-3 pt-24 ">
          <StepCard
            title="1/games"
            description="Deploy your game.  Your game tracks data and gameplay onchain.  It is the entry point and organizer for your game."
          />
          <StepCard
            title="2/components"
            description="Register your components.  Components are the building blocks of your game.  Discover them in the Library. "
          />
          <StepCard
            title="3/flows"
            description="Create your flows.  A flow lets you sequentially link functions on components together to create gameplay."
          />
        </div>
      </section>
      {/* <Divider /> */}

      <section className='px-12 py-24 md:p-24'>
        <SmallTitle title='Anything is possible' />
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 pt-24">
          <GamePitchCard
            title="1/drop in social games "
            description="Create Party Games for your token holders, friends, and communities.  Have people drop in and play."
          />
          <GamePitchCard
            title="2/deep token based games"
            description="Use your NFTs as characters or game pieces, and create worlds that players can explore with their tokens."
          />
          <GamePitchCard
            title="3/personalized games"
            description="Customize the components in your game, track what happens to them, and create a game that is unique to your community."
          />
          <GamePitchCard
            title="4/shared vocabulary"
            description="Every component function has requirements and effects.  This lets you chain them together, as long as the requirements are met."
          />
          <GamePitchCard
            title="5/custom gameplay"
            description="Anyone can write new components and get them added to the component registry, which is public and onchain."
          />
          <GamePitchCard
            title="6/simple usage"
            description="Players play your game by submitting a transaction to execute a flow, so if you do build a UI there is nothing complicated."
          />

        </div>
      </section>
    </main>
  );
}
