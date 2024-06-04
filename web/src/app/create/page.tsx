import Divider from '@/components/Divider';
import ChainTitle from '@/components/base/ChainTitle';
import CreateForm from '@/components/create/CreateForm';
import useDeployment from '@/hooks/useDeployment';
import useCreateEntity from '@/mutations/useCreateEntity';
import useCreateGame from '@/mutations/useCreateGame';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'



export default function Create() {

  // const { deploy } = useDeployment();
  // const { address } = useAccount()
  // // const { hash, error, isPending, writeToChain: createGame } = useCreateGame({ contractAddress: deploy.gameFactory });
  // const { createGameHash, createGameError, createGameisPending, writeCreateGameToChain } = useCreateGame({ contractAddress: deploy.gameFactory });
  // // const { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain } = useCreateEntity({ contractAddress: deploy.entityFactory });
  // // const { registerModule, registerModuleGameError, registerModuleisPending, writeRegisterModule } = useRegisterModule({contractAddress: deploy.});


  // async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   console.log('submit form');


  //   const formData = new FormData(e.target as HTMLFormElement)
  //   const tokenId = formData.get('tokenId') as string
  //   const displayName = formData.get('displayName') as string

  //   writeCreateGameToChain(address as Address, displayName);

  // }

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash: createGameHash
  //   });

  // async function create() {
  //   'use server'

  //   console.log("running on server")

  //   // ...
  // }

  return (
    <main className='items-center py-12 md:py-24 font-anon'>
      <section className='pt-36 min-w-full'>
        <ChainTitle title='Create' />
      </section>

      <section id='intro' className=' items-center p-12 md:p-24 '>
        <div className='flex'>
          <div className='justify-right md:w-1/2'></div>
          <div className='justify-right md:w-1/2 '>
            <p>
              Launch an onchain game for your community without writing a line of code.
              <br />
              <br />
              Gameplay is created by choosing the components you want.  Components are in the registry.
              <br />
              <br />
              After your game is created you can visit the Game Page and manage your component,
              set customization options, and create your Flows.
              <br />
              <br />
              Flows are how players will interact with your game.
              When you create a flow you choose the game functions on your selected components to chain together,
              and the flow will execute them in order.
              Note every component game function has inputs and outputs, allowing data to be passed around.

            </p>
          </div>

        </div>
      </section>
      <section>
        <CreateForm />
      </section>

      {/* <section className='pt-12'>
        <Divider />
      </section> */}

      <section id='hero' className='relative items-center pt-12'>
        {/* <p className=''>A Form to create your game is coming soon </p> */}
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
