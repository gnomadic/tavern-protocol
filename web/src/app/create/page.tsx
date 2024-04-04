import Header from '@/components/Header';
import Image from 'next/image';

export default function Create() {
  return (
    <main className='font-anon flex flex-col items-center p-40'>

      <section>
        <div className="flex  bg-slate-300 text-slate-600 p-8">
          <div className="mx-4 flex-auto w-64 text-center outline outline-2 outline-offset-2">
            step 1:
            <br />Choose Gameplay
          </div>
          <div className="mx-4 flex-auto w-64 text-center outline outline-2 outline-offset-2">
            step 2:
            <br /> Choose NFT
          </div>
          <div className="mx-4 flex-auto w-64 text-center outline outline-2 outline-offset-2">
            step 3: <br /> Deploy your game
          </div>
        </div>
      </section>

    </main>
  );
}
