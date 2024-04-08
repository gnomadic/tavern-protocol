"use client"
import useDeployment from '@/hooks/useDeployment';
import useCreateEntity from '@/mutations/useCreateEntity';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'


type StepTwoProps = {
  gameAddress: Address
}

export default function StepTwo(props: StepTwoProps) {
  const { deploy } = useDeployment();

  const { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain } = useCreateEntity({ contractAddress: deploy.entityFactory })
  const { isLoading: createEntityIsConfirming, isSuccess: createEntityIsConfirmed } = useWaitForTransactionReceipt({ hash: createEntityHash });

  return (
    <section>

      <div className='pt-36'>
        Step 2: Next, we create an entity and associate it with an NFT.  This button uses the D7 NFT but any NFT will work.
      </div>
      <div>
        <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
          disabled={createEntityisPending}
          onClick={() => {
            writeCreateEntityToChain(props.gameAddress as Address, "simple entity", "0x43B7D111d966e482bFf3B908Fa1ffE6D2E78f37A")

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
    </section>
  );
}
