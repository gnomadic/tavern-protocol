"use client"
import { Address } from 'viem';
import Divider from '../Divider';
import { useReadGameFlows, useReadGameGetFlows, useReadGameGetSummary } from '@/generated';
import { useMetadata } from '@/hooks/useMetadata';
import { GameMetadata, GameSummary } from '@/domain/Domain';


type StepThreeProps = {
    gameAddress: Address
}

export default function GameInfo(props: StepThreeProps) {

    const { data: summary } = useReadGameGetSummary({ address: props.gameAddress });
    const { data: flows } = useReadGameFlows({ address: props.gameAddress, args: ["playRPS", BigInt(0)] });
    const { data } = useMetadata<GameMetadata>(summary?.metadata);


    return (
        <section id='connect' className='relative items-center pt-12 pb-12'>
{JSON.stringify(data)}
            {summary && data ?
                <div>
                    {/* <div className="pb-8 text-xl">This Game has {data?.availableFunctions.length} available function{data.availableFunctions.length > 1 ? "s" : ""}</div> */}
                    <ul>
                        {/* {Array.from({ length: data?.availableFunctions.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center '>
                                    <div className='py-3 pl-8 text-lg'>{data!.availableFunctions[i].name} at {data!.availableFunctions[i].value}</div>

                                </div>
                            );
                        })} */}
                    </ul>
                    <div className="pt-12 pb-8 text-xl">This Game provides {summary?.flows.length} Flow{summary.flows.length > 1 ? "s" : ""}</div>
                    <ul>
                        {Array.from({ length: summary?.flows.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center border-t-2 border-b-2 border-gray-300 '>
                                    <div className='pt-5 pl-8 text-xl'>{summary!.flows[i]}</div>
                                    <div className="flex">
                                        <div className="mx-auto">
                                            requires
                                            {/* {Array.from({ length: data?.availableFunctions.length as number }).map((object, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div >{data!.availableFunctions[i].name}</div>
                                                    </div>
                                                );
                                            })} */}
                                        </div>
                                        <div className="pb-5 mx-auto">
                                            creates
                                            {Array.from({ length: summary?.availableData.length as number }).map((object, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className="mx-auto">{summary!.availableData[i].name}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
                :
                <></>}
        </section>


        //     <div className='pt-4'> This game offers the following Flows:</div>
        //     <ul>
        //         {Array.from({ length: gameSummary?.flows?.length ?? 0 }).map((object: any, i) => {
        //             return <li className='pt-2' key={i}>
        //                 <p>name:  {gameSummary!.flows![i]}</p>

        //             </li>

        //         })}
        //     </ul>

        //     <div className='pt-4'> Your game offers the following character stats at the following addresses:</div>
        //     <ul>
        //         {Array.from({ length: gameSummary?.availableData.length ?? 0 }).map((object: any, i) => {
        //             return <li className='pt-2' key={i}>
        //                 <p>address:  {gameSummary!.availableData[i].value}</p>
        //                 <p>function Name:  {gameSummary!.availableData[i].name}</p>
        //             </li>

        //         })}
        //     </ul>
        // </section >
    );
}
