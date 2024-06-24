import PlayRPS from '@/components/farcade/rps/PlayRPS';
import ChainTitle from '@/components/base/ChainTitle';
import RPSAction from '@/components/farcade/rps/RPSAction';
import RPSResult from '@/components/farcade/rps/RPSResult';
import RPSSplitPane from '@/components/farcade/rps/RPSSplitPane';

export default function Demo({ params }: { params: { address: string, chainid: string } }) {
  return (
    <main className=' font-signika'>
      

<RPSSplitPane/>

      
    </main>
  );
}
