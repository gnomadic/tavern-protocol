'use client';

import Header from '@/components/Header';
import useDeployment from '@/hooks/useDeployment';
import useCreateEntity from '@/mutations/useCreateEntity';
import useCreateGame from '@/mutations/useCreateGame';
import Image from 'next/image';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'



export default function Create() {

  const { deploy } = useDeployment();
  const { address } = useAccount()
  // const { hash, error, isPending, writeToChain: createGame } = useCreateGame({ contractAddress: deploy.gameFactory });
  const { createGameHash, createGameError, createGameisPending, writeCreateGameToChain } = useCreateGame({ contractAddress: deploy.gameFactory });
  const { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain } = useCreateEntity({ contractAddress: deploy.entityFactory });
  // const { registerModule, registerModuleGameError, registerModuleisPending, writeRegisterModule } = useRegisterModule({contractAddress: deploy.});


  async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit form');


    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    const displayName = formData.get('displayName') as string

    writeCreateGameToChain(address as Address, displayName);

  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: createGameHash
    });

  return (
    <main className='font-anon flex flex-col items-center p-40'>

      <section id='hero' className='relative  items-center pt-8'>
        <p className=''>1.  Choose gameplay.</p>
        <p className=''>2.  Choose NFTs.</p>
        <p className=''>3.  Deploy.</p>

        <p className='pt-12'> someday lol.  Today, just enter a name, hit deploy, and find your game in discover to get the prototype running.</p>
        {/* <p>deploy: {JSON.stringify(deploy, null, 2)}</p> */}
        <form onSubmit={handleCreateGame} className='pt-8'>
          <div className='text-3xl py-8'>create a Game</div>
          {/* <input name="tokenId" placeholder="69420" required className='text-slate-900' /> */}
          <p>
            <input name="displayName" placeholder="My New Game" required className='text-slate-900' />
          </p>
          <p>
            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
              disabled={createGameisPending}
              type="submit">
              {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`}
            </button>
          </p>
          {createGameHash && <div>Transaction Hash: {createGameHash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {createGameError && (
            <div>Error: {(createGameError as BaseError).shortMessage || createGameError.message}</div>
          )}

        </form>


      </section>
    </main>
  );
}
