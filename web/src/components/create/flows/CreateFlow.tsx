'use client'

import { useWriteGameFactoryCreateGame, useReadComponentRegistryGetComponents, useWriteGameFactoryCreateGameWithComponents, useReadGameGetSummary } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import { Address, getAddress, zeroAddress } from 'viem';
import { WriteIPFS } from '@/mutations/WriteIPFS';
import { toast } from 'react-toastify';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useMultipleRequests, { fetcher2, getMetadataURLsFromGame, useMetadataBatch } from '@/hooks/useMetadata';
import { bigIntReplacer } from '@/domain/utils';
import { ComponentMetadata } from '@/domain/Domain';
import ActionRow from './ActionRow';

type props = {
    address: string,
    chainid: string

}

export default function CreateFlow(props: props) {

    const { deploy } = useDeployment();
    const { address } = useAccount()
    const { data: currentModules, error: curError } = useReadComponentRegistryGetComponents({ address: deploy.componentRegistry, args: [0] })

    const { isPending: createGameisPending } = useWriteGameFactoryCreateGame();

    const [selectedComponents, setSelectedComponents] = useState<Address[]>([]);

    const { data: hash, error: writeError, writeContract } = useWriteGameFactoryCreateGameWithComponents();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

    const { data: summary } = useReadGameGetSummary({ address: props.address as Address });
    const { batch } = useMetadataBatch(getMetadataURLsFromGame(summary));

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

    // const {data: multi} = useMultipleRequests();


    async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();


        // fetcher2("ok", "one", "two", "three", "four");
        toast.info(`Uploading metadata to IPFS`);

        // const gameName = (e.currentTarget.elements.namedItem('gameName') as HTMLInputElement).value;
        // const gm = (e.currentTarget.elements.namedItem('gm') as HTMLInputElement).value;
        // const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        // const gameURL = (e.currentTarget.elements.namedItem('gameURL') as HTMLInputElement).value;

        // const components = selectedComponents;

        // console.log(gameName, gm, description, gameURL, components);

        // const response = await WriteIPFS(gameName, description, gameURL);
        // // console.log( JSON.stringify(await response.json()));
        // const ipfsJSON = await response.json();
        // toast.success(`Uploaded metadata!`);


        // const ipfsURL = `https://ipfs.io/ipfs/${ipfsJSON.IpfsHash}`

        // writeContract({ address: deploy.gameFactory, args: [getAddress(gm), ipfsURL, components] });



        // const { createGame, isPending: createGameisPending, hash: createGameHash, isConfirming, isConfirmed, error: createGameError } = useWriteGameFactoryCreateGame();

        // createGame(gameName, gm, description, gameURL, components);
    }

    const [selectedComponent, setSelectedComponent] = useState<>("")

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedComponent(event.target.value);
    }

    function addActionRow() {
        setActions([...actions, {
            address: summary?.componentSummaries[0].component as Address,
            func: batch[0].gameFunctions[0].abi
        }])
    }

    function removeActionRow(index: number) {
        const newActions = [...actions];
        newActions.splice(index, 1);
        setActions(newActions);
    }

    function updateAction(index: number, component: number, func: number) {
        const newActions = [...actions];
        console.log('updating action', index, component, func);
        newActions[index] = {
            address: summary?.componentSummaries[component].component as Address,
            func: batch[component].gameFunctions[func].abi
        };
        setActions(newActions);
    }

    const [actions, setActions] = useState<{ address: Address, func: string }[]>([]);




    return (


        <section className='px-8 py-20 md:px-24 lg:px-40'>

            <div className=" border border-white border-dashed">

                <div className='p-4 text-2xl'>
                    Create Flow
                </div>



                <form onSubmit={handleCreateGame} className=''>
                    <div className="grid grid-cols-1 gap-0">
                        <div className='px-4'>
                            <label htmlFor="gameName" className="text-lg font-outfit">
                                Flow Name
                            </label>
                            <input type="text" id="gameName" className="w-full p-2.5 bg-darkgrey active:bg-darkgrey my-4 focus:ring-selected focus:border-selected" placeholder="my cool flow" />
                        </div>

                        <div className="px-4 text-lg font-outfit">
                            Functions
                        </div>

                        {actions.map((action, i) =>
                            <ActionRow key={i}
                                index={i}
                                removeActionRow={removeActionRow}
                                action={action}
                                batch={batch}
                                updateAction={updateAction}
                            />
                        )}

                        <div
                            className='py-6 mx-4 mt-4 border-2 border-selected text-selected rounded-md text-center relative'
                            onClick={addActionRow}
                        >
                            <div className='text-4xl top-1/2 right-1/2 absolute -translate-y-1/2'>
                                +
                            </div>
                        </div>





                    </div>

                    <div className='flex p-4 inset-x-1 mt-4'>
                        <button
                            className='flex-grow py-2 mx-auto text-black rounded-md basis-0 bg-tavernGreen'
                            disabled={createGameisPending}
                            type="submit">
                            {createGameisPending ? 'Confirming...' : `Create`}
                        </button>
                    </div>

                    <div>
                        {JSON.stringify(actions, bigIntReplacer)}
                    </div>




                </form>
                <section>

                </section>
            </div>
        </section>


    );
}
