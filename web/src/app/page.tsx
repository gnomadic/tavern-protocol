import Divider from '@/components/Divider';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

export default function Home() {
  const verbs = ['play', 'create', 'grow', 'build'];
  // const [activeVerb, setActiveVerb] = useState(verbs[0]);

  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24 font-anon'>
      <section id='hero' className='relative items-center min-h-screen pt-48'>
        <p className=''>Play together with TAVERN.</p>
        <p className='pt-8'>Bring Games to your web3 Communities.</p>
        <p className='pt-8'>
          Launch codeless games onchain for your communities with
          Tavern.
        </p>
        <p className='pt-8'></p>
      </section>
      <section id='connect' className='relative items-center -mt-48'>

        <br />
        <p>
          We believe playing together fosters stronger connections through shared experiences.
          Everything we do, we try
          to enable and empower existing communities and their members. We just
          believe in the power of play.
          <br />
          <br />
          Tavern is an on-chain game engine made for existing web3
          communities. Launch your own game for your own community
          today without writing any code.  Join us on {' '}
          <a target="_blank"
            rel="noopener noreferrer"
            href="https://warpcast.com/~/channel/playtavern">
            Farcaster
            <span>
              <ArrowUpRightIcon
                className="w-4 h-4 mb-1 -ml-1"
                style={{ display: "inline" }} />
            </span>
          </a>
           {' '}to learn more
        </p>
      </section>
      <section>
        <Divider />
      </section>
    </main>
  );
}
