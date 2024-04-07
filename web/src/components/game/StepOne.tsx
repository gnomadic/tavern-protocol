"use client"
import useCurrentModules from '@/hooks/useCurrentModules';
import useDeployment from '@/hooks/useDeployment';
import useRegisterModule from '@/mutations/useRegisterModule';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'

type StepOneProps = {
  gameAddress: Address
}

export default function StepOne(props: StepOneProps) {
  const { deploy } = useDeployment();

  const { registerModuleHash, registerModuleGameError, registerModuleisPending, writeRegisterModule } = useRegisterModule({ contractAddress: props.gameAddress });
  const { isLoading: registerModuleIsConfirming, isSuccess: registerModuleIsConfirmed } = useWaitForTransactionReceipt({ hash: registerModuleHash });
  const { currentModules, currentModulesError } = useCurrentModules({ deploy: deploy, pageStart: 0 })

  return (
    <section>
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
    </section>
  );
}
