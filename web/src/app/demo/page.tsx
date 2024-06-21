import PlayRPS from '@/components/farcade/rps/PlayRPS';
import ChainTitle from '@/components/base/ChainTitle';
import RPSAction from '@/components/farcade/rps/RPSAction';
import RPSResult from '@/components/farcade/rps/RPSResult';

export default function Demo({ params }: { params: { address: string, chainid: string } }) {
  return (
    <main className=' font-signika'>
      <section>
        <div className='flex flex-col gap-8 px-8 py-20 md:px-16 md:flex-row'>
          <div className='border border-white border-dashed basis-1/3'>
            <RPSAction />
          </div>
          <div className='border border-white border-dashed basis-2/3'>
            <RPSResult/>
          </div>

        </div>


      </section>
      {/* <section className='min-w-full pt-36'>
        <ChainTitle title='Rock Paper Scissors' />
      </section>

      <PlayRPS /> */}

    </main>
  );
}
