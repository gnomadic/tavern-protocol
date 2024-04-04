'use client';

import Header from '@/components/Header';
import useCreateGame from '@/mutations/useCreateGame';
import Image from 'next/image';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'



export default function Create() {

  const { hash, error, isPending, writeToChain: createGame } = useCreateGame({ contractAddress: '0x2bc004f096AaEc3343Fe29fE1E6E918Ca44FA1F0' });


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit form');


    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string

    createGame();

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

        <form onSubmit={handleSubmit}>
          {/* <input name="tokenId" placeholder="69420" required className='text-slate-900' /> */}
          <input name="tokenId" placeholder="69420" className='text-slate-900' />
          <button className="pl-4"
            disabled={isPending}
            type="submit">
            {isPending ? 'Confirming...' : 'Mint'}
          </button>
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
