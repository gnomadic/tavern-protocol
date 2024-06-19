import { useMetadata } from '@/hooks/useMetadata';
import { censor, pretty } from '../../domain/utils';
import { Address, createClient, createPublicClient, parseAbi } from 'viem';
import { ComponentMetadata, ComponentMetadataFunction } from '@/domain/Domain';
import { Config, useClient, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { readContract } from '@wagmi/core'import { getClient, getConnectorClient } from '@wagmi/core'
import { config } from '@/domain/WagmiConfig';


type ModuleCardProps = {
  address: Address;
  metadata: string;
  index: number;
  gameAddress: Address;
}


export default function ModuleViewCard(props: ModuleCardProps) {
  const { data } = useMetadata<ComponentMetadata>(props.metadata);

  return (
    <div className='border-2 border-gray-500'>
      <div className='border-b-2 border-white text-2xl pl-4 py-2'>
        {props.index + 1}{"/"}{data ? censor(data.name) : "loading"}
      </div>
      <div className='grid grid-cols-1  gap-8 py-12 md:py-24'>

        {Array.from({ length: data?.configFunctions.length as number }).map((object, i) => {
          return (
            <ConfigViewCard
              key={i}
              index={i}
              funct={data?.configFunctions[i]!}
              address={props.address}
              gameAddress={props.gameAddress}
            />
          );
        })}
      </div>
    </div>
  );
}



type ConfigFunctionCardProps = {
  // displayName: string;
  index: number;
  funct: ComponentMetadataFunction
  address: Address;
  gameAddress: Address;

}

function ConfigViewCard(props: ConfigFunctionCardProps) {

  // const [args, setArgs] = useState<any[]>([props.gameAddress])
  const { data: hash, error: err, isPending: pending, writeContract } = useWriteContract()
  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })



  async function executeFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    let args = [];

    for (let i = 0; i < props.funct.requires.length; i++) {
      args.push((e.currentTarget.elements.namedItem(i.toString()) as HTMLInputElement).value)
    }
    let functionName = props.funct.abi.split("(")[0];

    console.log("Executing function");

 
    const data = await readContract(config as Config, {
      address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      abi: wagmigotchiABI,
      functionName: 'getHunger',
    })



  }

  useEffect(() => {
    if (err) {
      toast.error(err.message)
    }
    if (isLoading) {
      toast.info("Transaction is pending");

    }
    if (isSuccess) {
      toast.success("Transaction is successful");
    }
  }
    , [err, isLoading, isSuccess])




  return (
    <div className='border-2 border-gray-500 mx-12'>
      {/* <div className='border-b-2 border-white text-2xl pl-4 py-2'> */}
      <div className='pt-5 pl-5 text-lg border-b-2 border-white '>

        {props.index + 1}{"/"}{props.funct.name}
      </div>
      <div className='pt-5 pb-2 pl-2 text-sm'>
        {censor(props.funct.description)}
      </div>
      <form onSubmit={executeFunction} className='pt-8 px-4 '>
        {Array.from({ length: props.funct.requires.length as number }).map((object, i) => {
          return <div key={i} className=''>
            <label htmlFor="gameName" className="block mb-2 text-sm text-white text-start">
              {props.funct.requires[i]}
            </label>
            <input type="text" 
            id={i.toString()} 
            className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" 
            placeholder={props.funct.requires[i]}
            value={props.funct.requires[i] === "gameAddress" ? props.gameAddress : ""} />
          </div>
        })}
        <div className='pt-4'>
          <button className="px-12 border-slate-400 border-[2px] py-4 mt-4 mb-12"
            // disabled={createGameisPending}
            type="submit">
            Execute
            {/* {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`} */}
          </button>
        </div>
      </form>
    </div>
  );
}
