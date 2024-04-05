'use client';

import Header from '@/components/Header';
import useDeployment from '@/hooks/useDeployment';
import useCreateGame from '@/mutations/useCreateGame';
import Image from 'next/image';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'



export default function Create() {

  const { deploy } = useDeployment();
  const { address } = useAccount()
  const { hash, error, isPending, writeToChain: createGame } = useCreateGame({ contractAddress: deploy.gameFactory });


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit form');


    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    const displayName = formData.get('displayName') as string

    createGame(address as Address, displayName);

  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })


  return (
    <main className='font-anon flex flex-col items-center p-40'>

      <section id='hero' className='relative  items-center pt-8'>
        <p className=''>1.  Choose gameplay.</p>
        <p className=''>2.  Choose NFTs.</p>
        <p className=''>3.  Deploy.</p>
        {/* <p>deploy: {JSON.stringify(deploy, null, 2)}</p> */}
        <form onSubmit={handleSubmit} className='pt-8'>
          {/* <input name="tokenId" placeholder="69420" required className='text-slate-900' /> */}
          <p>
          <input name="displayName" placeholder="My New Game" required className='text-slate-900' />
          </p>
          <p>
          <button className="pl-4"
            disabled={isPending}
            type="submit">
            {isPending ? 'Confirming...' : `Deploy on ${deploy.chain}`}
          </button>
          </p>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>Error: {(error as BaseError).shortMessage || error.message}</div>
          )}
          
        </form>


      </section>
    </main>
  );
}
