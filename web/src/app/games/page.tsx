import ExploreGames from '@/components/explore/ExploreGames';
import ChainTitle from '@/components/base/ChainTitle';

export default function Games() {
  return (
    <main className='font-signika'>
      <ExploreGames />
    </main>
    // <main className='items-center py-12 md:py-24 font-anon'>
    //   <section className='pt-36 min-w-full'>

    //     <ChainTitle title='games' />
    //   </section>
    //   <section id='intro' className=' items-center p-12 md:p-24 '>
    //     <div className='flex'>
    //       <div className='justify-right md:w-1/2'></div>
    //       <div className='justify-right md:w-1/2 '>
    //         <p>
    //           These games are all unique.  Each one has its own data, set of components, and flows.
    //           Data is stored onchain uniquely for each game.  Data is accessed by components, which provide gameplay.
    //           Lastly, flows are the sequences of functions from components that are executed in a game.
    //         </p>
    //       </div>
    //     </div>
    //   </section>
    //   <ExploreGames />
    // </main>
  );
}
