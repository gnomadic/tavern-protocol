'use client'

import { useWriteGameFactoryCreateGame, useReadComponentRegistryGetComponents, useWriteGameFactoryCreateGameWithComponents } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import SmallTitle from '../base/SmallTitle';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import ChooseModule from './ChooseModule';
import { useEffect, useState } from 'react';
import { Address, getAddress } from 'viem';
import { WriteIPFS } from '@/mutations/WriteIPFS';
import { toast } from 'react-toastify';
import CreateForm from './CreateFormOld';
import CreateGameForm from './CreateGameForm';
import CreateGameModules from './CreateGameModules';

export default function TwoPaneCreate() {

    const { deploy } = useDeployment();
    const { address } = useAccount()
    const { data: currentModules, error: curError } = useReadComponentRegistryGetComponents({ address: deploy.componentRegistry, args: [0] })

    const { isPending: createGameisPending } = useWriteGameFactoryCreateGame();

    const [selectedComponents, setSelectedComponents] = useState<Address[]>([]);

    const { data: hash, error: writeError, writeContract } = useWriteGameFactoryCreateGameWithComponents();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        if (writeError) {
            toast.error(writeError.message);
        }

        if (isLoading) {
            toast.info("Transaction is pending");

        }
        if (isSuccess) {
            toast.success("Transaction is successful");
        }

    }, [writeError, isLoading, isSuccess]);




    async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        toast.info(`Uploading metadata to IPFS`);

        const gameName = (e.currentTarget.elements.namedItem('gameName') as HTMLInputElement).value;
        const gm = (e.currentTarget.elements.namedItem('gm') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const gameURL = (e.currentTarget.elements.namedItem('gameURL') as HTMLInputElement).value;

        const components = selectedComponents;

        console.log(gameName, gm, description, gameURL, components);

        const response = await WriteIPFS(gameName, description, gameURL);
        // console.log( JSON.stringify(await response.json()));
        const ipfsJSON = await response.json();
        toast.success(`Uploaded metadata!`);


        const ipfsURL = `https://ipfs.io/ipfs/${ipfsJSON.IpfsHash}`

        writeContract({ address: deploy.gameFactory, args: [getAddress(gm), ipfsURL, components] });



        // const { createGame, isPending: createGameisPending, hash: createGameHash, isConfirming, isConfirmed, error: createGameError } = useWriteGameFactoryCreateGame();

        // createGame(gameName, gm, description, gameURL, components);
    }




    return (
        <section>
        <div className='flex flex-col gap-8 px-8 py-20 md:px-16 md:flex-row'>
          <div className='border border-white border-dashed basis-1/3'>
            <CreateGameForm />
          </div>
          <div className='border border-white border-dashed basis-2/3'>
            <CreateGameModules/>
          </div>
  
        </div>
  
  
      </section>
    );
}
