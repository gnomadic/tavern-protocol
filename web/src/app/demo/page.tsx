import PlayRPS from '@/components/farcade/rps/PlayRPS';
import ChainTitle from '@/components/base/ChainTitle';

export default function Demo({ params }: { params: { address: string, chainid: string } }) {
  return (
    <main className='items-center py-12 md:py-24 font-anon'>
      <section className='pt-36 min-w-full'>
        <ChainTitle title='Rock Paper Scissors' />
      </section>

      <PlayRPS />

    </main>
  );
}
