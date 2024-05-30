import ExploreComponents from '@/components/explore/ExploreComponents';
import ExploreHeader from '@/components/explore/ExploreHeader';
import ExploreTabs from '@/components/explore/ExploreTabs';

export default function Registry() {
  return (
    <main className='items-center py-12 md:py-24 font-anon'>
      <section className='pt-36 min-w-full'>
        <ExploreHeader title='Registry' />
        {/* <div className='uppercase text-7xl md:text-9xl border-t-2 border-b-2 border-white text-center '>
          registry
        </div> */}
      </section>
      <section id='intro' className=' items-center p-12 md:p-24 '>
        <div className='flex'>
          <div className='justify-right md:w-1/2'></div>
          <div className='justify-right md:w-1/2 '>
            <p>
              These components are the building blocks of games.  
              Each one provides both game functions, which you can use for your gameplay, 
              as well as config functions, which you can use to customize, stylize, 
              and personalize the rules.
              <br />
              <br />
              Every function in a component has required keys and created keys.  
              Required keys can either be passed in by the player when they execute a Flow, 
              they can be hardcoded by the game creator, or they can be
              created by another preceding component in a Flow.  
              {/* These game components act as the fundamental building blocks that you can use to build your game.
              They offer a two-pronged approach, providing both the core mechanics that drive the
              gameplay itself (game functions) and the options to personalize the experience 
              aesthetically and strategically (config functions).
              This allows for a delightful blend of enjoyment and endless variation within the game.
              Tavern is an on-chain game engine made for existing web3
              communities. Launch your own game for your own community
              today by submitting transactions, without writing any code. */}
            </p>
          </div>

        </div>
      </section>
      <ExploreComponents />
    </main>
  );
}
