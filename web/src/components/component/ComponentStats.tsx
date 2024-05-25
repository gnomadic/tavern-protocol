"use client"

import { ComponentMetadata } from "@/domain/Domain";
import { censor } from "@/domain/utils";
import { useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useMetadata } from "@/hooks/useMetadata";
import { Address } from "viem";

type StatsProps = {
    moduleAddress: Address
}

export default function ComponentStats(props: StatsProps) {

    const { deploy } = useDeployment();
    const { data: summary } = useReadIComponentGetSummary({ address: props.moduleAddress })
    const { data } = useMetadata<ComponentMetadata>(summary?.metadata);

    return (
        <section id='connect' className='relative items-center pt-12 pb-12'>
            {summary && data ?
                <div>
                    <div className="text-3xl uppercase">
                        {'/'}lib/{censor(data.name)}{'/'}functions{'/'}{data.gameFunctions?.length}
                        </div>

                    <ul className="">
                        {Array.from({ length: data.gameFunctions?.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center pt-12'>
                                    <div className='pt-5 pl-5 text-lg border-b-2 border-white'>
                                        {data.gameFunctions[i].name}{' '}
                                    </div>
                                    <div className='pt-2 text-sm'>
                                        {data.gameFunctions[i].description}
                                    </div>

                                    <div className="grid md:grid-cols-2 py-8 gap-8">
                                        <div className="mx-12">
                                            <div className="border-b-2 border-white text-xs ">
                                                required keys
                                            </div>

                                            {Array.from({ length: data!.gameFunctions[i].requires.length as number }).map((object, j) => {
                                                return (
                                                    <span key={i}>
                                                        {data.gameFunctions[i].requires[j]} {''}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div className="mx-12">
                                            <div className="border-b-2 border-white text-xs">
                                                created keys
                                            </div>

                                            {Array.from({ length: data!.gameFunctions[i].creates.length as number }).map((object, j) => {
                                                return (
                                                    <p key={i}>
                                                        {data.gameFunctions[i].creates[j]} {''}
                                                    </p>
                                                );
                                            })}
                                            {data.gameFunctions[i].creates.length === 0 ? <p>none</p> : <></>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                    <div className="text-3xl uppercase pt-12">
                        {'/'}lib/{censor(data.name)}{'/'}config{'/'}{data.configFunctions?.length}
                        </div>
                        <ul className="">
                        {Array.from({ length: data.configFunctions?.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center pt-12'>
                                    <div className='pt-5 pl-5 text-lg border-b-2 border-white'>
                                        {data.configFunctions[i].name}{' '}
                                    </div>
                                    <div className='pt-2 text-sm'>
                                        {data.configFunctions[i].description}
                                    </div>

                                    <div className="grid md:grid-cols-2 py-8 gap-8">
                                        <div className="mx-12">
                                            <div className="border-b-2 border-white text-xs ">
                                                abi
                                            </div>

                                            {Array.from({ length: data!.gameFunctions[i].requires.length as number }).map((object, j) => {
                                                return (
                                                    <span key={i}>
                                                        {data.configFunctions[i].requires[j]} {''}
                                                        
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div className="mx-12">
                                            <div className="border-b-2 border-white text-xs">
                                                created keys
                                            </div>

                                            {Array.from({ length: data!.configFunctions[i].creates.length as number }).map((object, j) => {
                                                return (
                                                    <p key={i}>
                                                        {data.configFunctions[i].creates[j]} {''}
                                                    </p>
                                                );
                                            })}
                                            {data.configFunctions[i].creates.length === 0 ? <p>none</p> : <></>}
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

    );

}
