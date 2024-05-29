import ExploreGames from '@/components/explore/ExploreGames';
import ExploreTabs from '@/components/explore/ExploreTabs';

export default function Games() {
  return (
    <main className='items-center py-12 md:py-24 font-anon'>
      <section className='pt-36 min-w-full'>
        <div className='uppercase text-7xl md:text-9xl border-t-2 border-b-2 border-white text-center '>
          games
        </div>
      </section>
      <ExploreGames />  
    </main>
  );
}
