import RPSSplitPane from '@/components/farcade/rps/RPSSplitPane';

export default function Demo({ params }: { params: { address: string, chainid: string } }) {
  return (
    <main className='font-signika'>
      <RPSSplitPane />
    </main>
  );
}
