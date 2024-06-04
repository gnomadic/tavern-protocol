'use client'
import { useWriteGameFactoryCreateGame, useReadComponentRegistryGetComponents, useWriteGameFactoryCreateGameWithComponents } from '@/generated';
import useDeployment from '@/hooks/useDeployment';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import SmallTitle from '../base/SmallTitle';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import ModuleCard from '../ModuleCard';
import ChooseModule from './ChooseModule';
import { useEffect, useState } from 'react';
import { Address, getAddress } from 'viem';
import { WriteIPFS } from '@/mutations/WriteIPFS';
import { toast } from 'react-toastify';

export default function CreateForm() {

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
            // refetchGetLastGame();
            // refetchQueuePlayers();
            // refetchInQueue();

        }

    }, [writeError, isLoading, isSuccess, data]);




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
        <section id='hero' className='relative items-center pt-12 text-center'>
            <SmallTitle title='Create' />
            <div className='py-12 md:py-24'>
                Everything here can be edited after the game is live.
            </div>



            <form onSubmit={handleCreateGame} className='pt-8 px-24 '>
                <div className="grid gap-6 grid-cols-1">
                    {/* <div className="grid gap-6 mb-6 md:grid-cols-2"> */}
                    <div>
                        <label htmlFor="gameName" className="block mb-2 text-sm text-white text-start">
                            Game Name
                        </label>
                        <input type="text" id="gameName" className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="my cool game" />
                    </div>

                    <div>
                        <label htmlFor="gm" className="block mb-2 text-sm text-white text-start">
                            Game Manager (GM)
                        </label>
                        <input type="text" id="gm" className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder={address} disabled value={address ? address : ""} />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm text-white text-start">
                            Description
                        </label>
                        <textarea id="description" className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="how would you describe your game" />
                    </div>
                    <div>
                        <label htmlFor="gameURL" className="block mb-2 text-sm text-white text-start">
                            Website
                        </label>
                        <input type='text' id="gameURL" className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="Where can people learn more?" />
                    </div>
                    <label htmlFor="gameURL" className="block mb-2 text-sm text-white text-start">
                        Components (Choose as many as you want)
                    </label>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-12'>
                        {Array.from({ length: currentModules?.length as number }).map((object, i) => {
                            if (currentModules![i].component !== '0x0000000000000000000000000000000000000000') {

                                return (
                                    <ChooseModule
                                        key={i}
                                        index={i}
                                        address={currentModules![i].component!}
                                        metadata={currentModules![i].metadata!}
                                        selected={selectedComponents}
                                        setSelected={(address) => {
                                            if (selectedComponents.includes(address)) {
                                                setSelectedComponents(selectedComponents.filter((a) => a !== address));
                                            } else {
                                                setSelectedComponents([...selectedComponents, address]);
                                            }

                                        }}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                {/* <div className='w-screen'>
                    <input name="displayName" placeholder="My New Game" required className='text-slate-900' />
                </div> */}
                <div className='pt-12 md:pt-24'>


                    Once your game is created, visit the game page to create flows and edit your game.
                </div>
                <div className='pt-12 md:pt-24'>
                    <button className="px-12 border-slate-400 border-[2px] px-24 py-4 mt-4"
                        disabled={createGameisPending}
                        type="submit">
                        {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`}
                    </button>
                </div>
                {/* {createGameHash && <div>Transaction Hash: {createGameHash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {createGameError && (
            <div>Error: {(createGameError as BaseError).shortMessage || createGameError.message}</div>
          )} */}

            </form>
            <section>
                {/* <div>pending: {JSON.stringify(hash)}</div>
            <div>error: {JSON.stringify(writeError)}</div> */}
            </section>
        </section>


    );
}
