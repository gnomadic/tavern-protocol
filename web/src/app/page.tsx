import SmallTitle from '@/components/base/SmallTitle';
import ChainTitle from '@/components/base/ChainTitle';
import GamePitchCard from '@/components/landing/GamePitchCard';
import StepCard from '@/components/landing/StepCard';
import door from "@/images/door.png";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  return (
    <main className='items-center py-12 md:py-24 font-outfit'>
      <section className='pt-12 min-w-full '>
        <Image
          className='mx-auto'
          src={door}
          alt="door"
          width={300}
          height={300}
        />
        <div className='mx-auto text-center  text-3xl text-white'>
          Build community by gaming <br /> and hanging out
        </div>
        <div className='mx-auto text-center text-xl text-lightgrey pt-4'>
          Made for web3 communities <br />
          looking to launch gaming infrastructure
        </div>
        <div className='mx-auto text-center'>
          <Link
            href='/demo'>
            <button
              className='bg-tavernGreen text-black rounded-lg px-4 py-2 mt-8 mx-auto'
            >
              Try Demo
            </button>
          </Link>
        </div>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 pt-24 md:gap-y-72 gap-24 text-center md:text-left md:px-12'>
      <div className='hidden md:block' />
        <div>
          <div className='text-3xl '>
            Super easy to get started. <br /> Seriously, no code.
          </div>
          <div className='text-lightgrey text-xl'>
            All it takes is submitting transactions. <br />  Choose your gameplay, customize it, and launch it.
          </div>
        </div>
        <div>
          <div className='text-3xl '>
            We believe in the power of play. <br />
          </div>
          <div className='text-lightgrey text-xl'>
            Communities are stronger when they play together.
          </div>
        </div>
        <div className='hidden md:block' />
        <div className='hidden md:block' />
        <div>
          <div className='text-3xl '>
            Completely onchain <br />
          </div>
          <div className='text-lightgrey text-xl'>
            Data, gameplay, and rules are all stored onchain. <br />
            This means your game is transparent, secure, and unstoppable. <br />
            And it means you don&apos;t have to worry about a server.
          </div>
        </div>
      </section>
      <section className='pt-12 md:pt-48 min-w-full '>

        <div className='mx-auto text-center  text-3xl text-white'>
          Want a custom solution?
        </div>
        <div className='mx-auto text-center text-xl text-lightgrey pt-4'>
          We help developers and NFT collections build custom games  <br />
          that are white labeled with our protocol
        </div>
        <div className='mx-auto text-center'>
          <Link
            href='/intro'>
            <button
              className='bg-tavernGreen text-black rounded-lg px-4 py-2 mt-8 mx-auto'
            >
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
