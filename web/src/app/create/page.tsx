'use client';
import Divider from '@/components/Divider';
import useDeployment from '@/hooks/useDeployment';
import useCreateEntity from '@/mutations/useCreateEntity';
import useCreateGame from '@/mutations/useCreateGame';
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
    <main className='flex flex-col items-center justify-between min-h-screen p-24 font-anon'>
      <section id='hero' className='relative items-center pt-48'>
        <p className=''>Games can be created by submitting transactions.  You do not have to write any code.</p>
        <p className='pt-8'>
          Tavern provides a set of Components that can be combined and customized to fit your gameplay.
        </p>
        <p className='pt-8'>Permissionless, free, and on-chain.</p>
      </section>

      <section className='pt-12'>
        <Divider />
      </section>

      <section id='hero' className='relative items-center pt-12'>
        <p className=''>A Form to create your game is coming soon </p>
        {/* <p className='pt-8'>
          You can launch a game by executing the following functions on the following contracts
        </p>
        <p className='pt-8'>Launch a game on {deploy.chain}</p>
        <ul className='pt-8'>
          <li>1.  Use the Game Factory to Deploy your Game contract.</li>
          <li>2.  Call the `addComponent` function on your Game contract to add the components you want.</li>
          <li>3.  Create Flows by chaining together component functions and give them a name</li>
          <li>4.  Execute Flows to play! </li>
        </ul> */}
      </section>

      {/* 
      <section id='hero' className='relative items-center pt-8'>
        <p className=''>Creating Games will be Phase 2 of this Prototype.</p>
        <p className=''>2.  Choose NFTs.</p>
        <p className=''>3.  Deploy.</p>

        <p className='pt-12'> someday lol.  Today, just enter a name, hit deploy, and find your game in discover to get the prototype running.</p>
        <form onSubmit={handleCreateGame} className='pt-8'>
          <div className='py-8 text-3xl'>create a Game</div>
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


      </section> */}
    </main>
  );
}
