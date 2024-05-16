"use client"
import { ComponentSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import { useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useGameMetadata } from "@/hooks/useGameMetadata";
import useGameSummary from "@/hooks/useGameSummary";
import { useEffect, useState } from "react";
import { Address } from "viem";


type StatsProps = {
    moduleAddress: Address
}

export default function ComponentStats(props: StatsProps) {

    const { deploy } = useDeployment();
    const { data: summary } = useReadIComponentGetSummary({ address: props.moduleAddress })
    const { data } = useGameMetadata(summary?.metadata);

    return (
        <section id='connect' className='relative items-center pt-12 pb-12'>
            {summary && data ?
                <div>
                    <div className="pb-8 text-xl">This Component provides {data?.functions.length} Function{data.functions.length > 1 ? "s" : ""}</div>
                    <ul>
                        {Array.from({ length: data?.functions.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center border-t-2 border-b-2 border-gray-300 '>
                                    {/* <div className='pt-5 pl-8 text-xl'>{data!.functions[i]}</div> */}
                                    <div className="flex">
                                        <div className="mx-auto">
                                            requires
                                            {/* {Array.from({ length: data?.required.length as number }).map((object, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div >{data!.required[i]}</div>
                                                    </div>
                                                );
                                            })} */}
                                        </div>
                                        <div className="pb-5 mx-auto">
                                            creates
                                            {/* {Array.from({ length: summary?.required.length as number }).map((object, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className="mx-auto">{summary!.required[i]}</div>
                                                    </div>
                                                );
                                            })} */}
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
