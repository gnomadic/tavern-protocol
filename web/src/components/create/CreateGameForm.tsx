'use client'

import { useWriteGameFactoryCreateGame, useReadComponentRegistryGetComponents, useWriteGameFactoryCreateGameWithComponents } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import { Address, getAddress } from 'viem';
import { WriteIPFS } from '@/mutations/WriteIPFS';
import { toast } from 'react-toastify';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CreateGameForm() {

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


        <section className='relative min-h-[500px] md:min-h-[500px]' >
            <div className='p-4 text-2xl'>
                Create a new game
            </div>

            <form onSubmit={handleCreateGame} className=''>
                <div className="grid grid-cols-1 gap-0">
                    <div className='px-4'>
                        <label htmlFor="gameName" className="text-lg font-outfit">
                            Game Name
                        </label>
                        <input type="text" id="gameName" className="w-full p-2.5 bg-darkgrey active:bg-darkgrey my-4 focus:ring-selected focus:border-selected" placeholder="my cool game" />
                    </div>
                    <div className='px-4'>
                        <label htmlFor="gm" className="text-lg font-outfit">
                            Game Manager (GM)
                        </label>
                        <input type="text" id="gm" className="w-full p-2.5 bg-darkgrey my-4" placeholder={address} disabled value={address ? address : ""} />
                    </div>
                    <div className='px-4'>
                        <label htmlFor="description" className="text-lg font-outfit">
                            Description
                        </label>
                        <textarea id="description" className="w-full p-2.5 bg-darkgrey my-4 focus:ring-selected focus:border-selected" placeholder="how would you describe your game?" />
                    </div>
                    <div className='px-4'>
                        <label htmlFor="gameURL" className="text-lg font-outfit">
                            Website
                        </label>
                        <input type='text' id="gameURL" className="w-full p-2.5 bg-darkgrey active:bg-darkgrey my-4 focus:ring-selected focus:border-selected" placeholder="Where can people learn more?" />
                    </div>
                    <div className='px-4'>
                        <label htmlFor="gameURL" className="text-lg font-outfit">
                            Chain
                        </label>
                        <div className='pt-4'>
                        <ConnectButton 
                            chainStatus={"full"}
                            accountStatus={'avatar'}
                            showBalance={false}
                        />
                        </div>
                    </div>
                    {/* <label htmlFor="gameURL" className="block mb-2 text-sm text-white text-start">
                        Components (Choose as many as you want)
                    </label> */}

                </div>
                {/* 
                <div className='pt-12 md:pt-24'>


                    Once your game is created, visit the game page to create flows and edit your game.
                </div> */}
                <div className='flex p-4 inset-x-1 mt-4'>
                    <button
                        className='flex-grow py-2 mx-auto text-black rounded-md basis-0 bg-tavernGreen'
                        disabled={createGameisPending}
                        type="submit">
                        {createGameisPending ? 'Confirming...' : `Launch`}
                    </button>
                </div>




            </form>
            <section>

            </section>
        </section>


    );
}
