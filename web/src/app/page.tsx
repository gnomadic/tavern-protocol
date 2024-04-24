import Divider from '@/components/Divider';

export default function Home() {
  const verbs = ['play', 'create', 'grow', 'build'];
  // const [activeVerb, setActiveVerb] = useState(verbs[0]);

  return (
    <main className='font-anon flex min-h-screen flex-col items-center justify-between p-24'>
      <section id='hero' className='relative min-h-screen items-center pt-48'>
        <p className=''>Play together.</p>
        <p className='pt-8'>Bring Games to your web3 Communities.</p>
        <p className='pt-8'>
          Launch codeless games onchain for your favorite NFT communities with
          Tavern.
        </p>
        <p className='pt-8'>We believe in the power of play to foster stronger connections and shared experiences.</p>
      </section>
      <section id='connect' className='relative -mt-48 items-center'>

        <br />
        <p>
          
          Our mission is to make communities stronger. Everything we do, we try
          to enable and empower existing communities and their members. We also
          believe in the power of play.
          <br />
          <br />
          Tavern is an on-chain game engine made for existing NFTs and their
          communities. Plug in your favorite NFT and launch your own game for your own community
          today.
        </p>
      </section>
      <section>
        <Divider />
      </section>
    </main>
  );
}
