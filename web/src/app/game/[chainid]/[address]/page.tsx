"use client";
import Divider from '@/components/Divider';
import { pretty } from '@/domain/utils';
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useGameSummary from '@/hooks/useGameSummary';
import useCreateEntity from '@/mutations/useCreateEntity';
import useRegisterEntity from '@/mutations/useRegisterEntity';
import useRegisterModule from '@/mutations/useRegisterModule';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'


export default function Game({ params }: { params: { address: string } }) {
  // const verbs = ['play', 'create', 'grow', 'build'];
  // const [activeVerb, setActiveVerb] = useState(verbs[0]);
  const { deploy } = useDeployment();
  const { gameSummary, gameSummaryError } = useGameSummary({ address: params.address as Address });
  const { currentModules, currentModulesError } = useCurrentModules({ deploy: deploy, pageStart: 0 })

  const { registerModuleHash, registerModuleGameError, registerModuleisPending, writeRegisterModule } = useRegisterModule({ contractAddress: params.address as Address });
  const { isLoading: registerModuleIsConfirming, isSuccess: registerModuleIsConfirmed } = useWaitForTransactionReceipt({ hash: registerModuleHash });

  const { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain } = useCreateEntity({ contractAddress: deploy.entityFactory })
  const { isLoading: createEntityIsConfirming, isSuccess: createEntityIsConfirmed } = useWaitForTransactionReceipt({ hash: createEntityHash });

  // const { registerEntityHash, registerEntityGameError, registerEntityisPending, writeRegisterEntity } = useRegisterEntity({ contractAddress: params.address as Address });
  // const { isLoading: registerEntityIsConfirming, isSuccess: registerEntityIsConfirmed } = useWaitForTransactionReceipt({ hash: registerModuleHash });

  return (
    <main className='font-anon flex flex-col items-center justify-between p-24'>
      <section id='connect' className='relative pt-48 items-center'>
        <div className='text-8xl pb-8'>
          {gameSummary ? gameSummary.displayName : "loading"}
        </div>
        <div>
          game master: {gameSummary ? pretty(gameSummary.gm as Address) : "loading"}
        </div>
        {/* <div className='pt-4'>
          Every Game is composed of Modules and Entities.  Modules contain gameplay, and Entities contain data.
        </div> */}
      </section>
      {/* <section className='pt-24'>
        <Divider />
      </section> */}
      <section id='connect' className='relative pt-8 items-center'>

        <div className='pt-4'>
          Every Game is a collection of Modules and Entities.  Modules contain gameplay, and Entities contain data.
        </div>
        <div className='pt-4'>
          As a developer, it is very straightforward to add new gameplay and features through modules.  This Demo module is 8 lines of code.
        </div>
        <div className='pt-4'>
          As a proof of concept, our UX is terrible right now so bear with us, and follow the steps below.
        </div>
        <section className='py-20'>
          <Divider />
        </section>
        <div className='pt-12'>
          Step 1: First, we choose the gameplay modules we want in our game.  There is a public registry, and right now only one available module.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={registerModuleisPending || !currentModules}
            onClick={() => {
              writeRegisterModule(currentModules[0].module)

            }}
          >
            {registerModuleisPending ? 'Confirming...' : `Register Module`}
          </button>

          {registerModuleHash && <div>Transaction Hash: {registerModuleHash}</div>}
          {registerModuleIsConfirming && <div>Waiting for confirmation...</div>}
          {registerModuleIsConfirmed && <div>Transaction confirmed.</div>}
          {registerModuleGameError && (
            <div>Error: {(registerModuleGameError as BaseError).shortMessage || registerModuleGameError.message}</div>
          )}
        </div>


        <div className='pt-36'>
          Step 2: Next, we create an entity and associate it with an NFT.  This button is uses the D7 NFT but any NFT will work.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={createEntityisPending}
            onClick={() => {
              writeCreateEntityToChain(params.address as Address, "simple entity", "0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A")

            }}
          >
            {createEntityisPending ? 'Confirming...' : `create Entity`}
          </button>

          {createEntityHash && <div>Transaction Hash: {createEntityHash}</div>}
          {createEntityIsConfirming && <div>Waiting for confirmation...</div>}
          {createEntityIsConfirmed && <div>Transaction confirmed.</div>}
          {createEntityError && (
            <div>Error: {(createEntityError as BaseError).shortMessage || createEntityError.message}</div>
          )}
        </div>


        {/* <div className='pt-36'>
          Step 3: Register the Entity with your game.
        </div>
        <div>
          <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
            disabled={registerModuleisPending || !currentModules}
            onClick={() => {
              writeRegisterEntity(currentModules[0].module)

            }}
          >
            {registerModuleisPending ? 'Confirming...' : `Register Module`}
          </button>
        
        {registerModuleHash && <div>Transaction Hash: {registerModuleHash}</div>}
        {registerModuleIsConfirming && <div>Waiting for confirmation...</div>}
        {registerModuleIsConfirmed && <div>Transaction confirmed.</div>}
        {registerModuleGameError && (
          <div>Error: {(registerModuleGameError as BaseError).shortMessage || registerModuleGameError.message}</div>
        )}
        </div> */}





        <div className='pt-36'>
          Step 3: All set!  Once those two transactions are done, you can reload the page!
        </div>
      </section>
      <section className='pt-24'>
        <Divider />
      </section>
      <div> Your Game is at: {gameSummary?.game} </div>
      <div className='pt-4'> Your game offers the following functions at the following addresses: </div>
        <ul>
        {Array.from({ length: gameSummary?.availableFunctions.length }).map((object: any, i) => {
            return <li className='pt-2' key={i}>
              <p>address:  {gameSummary.availableFunctions[i].Address}</p>
              <p>function Name:  {gameSummary.availableFunctions[i].Key}</p>
            </li>
            
          })}
        </ul>

        <div className='pt-4'> Your game offers the following character stats at the following addresses:</div>
        <ul>
        {Array.from({ length: gameSummary?.availableData.length }).map((object: any, i) => {
            return <li className='pt-2' key={i}>
              <p>address:  {gameSummary.availableData[i].Address}</p>
              <p>function Name:  {gameSummary.availableData[i].Key}</p>
            </li>
            
          })}
        </ul>

      {/* <div className='pt-24 mx-4'>{JSON.stringify(gameSummary, null, 2)}</div> */}
    
    </main>
  );
}
