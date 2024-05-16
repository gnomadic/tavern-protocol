"use client"

import { ComponentMetadata } from "@/domain/Domain";
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
                    <div className="pb-8 text-xl">This Component provides {data.functions?.length} Game Function{data.functions?.length > 1 ? "s" : ""}.</div>
                    <ul className="border-t-2 border-gray-300">
                        {Array.from({ length: data.functions?.length as number }).map((object, i) => {
                            return (
                                <div key={i} className='justify-center border-b-2 border-gray-300 '>
                                    <div className='pt-5 pl-8 text-2xl'>
                                        <span className="text-sm">the</span>
                                        {' '}{data.functions[i].name}{' '}
                                        <span className="text-sm">function.</span>
                                    </div>
                                    <div className='pt-2 text-xl'>{data.functions[i].description}</div>
                                    {/* <div className="flex py-8"> */}
                                    <div className="mx-auto p-4">
                                        <p className="">
                                            This keys required by this function are

                                        </p>
                                        {Array.from({ length: data!.functions[i].requires.length as number }).map((object, j) => {
                                            return (
                                                <span key={i}>
                                                    {data.functions[i].requires[j]} {''}
                                                </span>
                                            );
                                        })}

                                    </div>
                                    <div className="mx-auto p-4">
                                        <p className="">

                                            This keys created by this function are
                                        </p>
                                        {Array.from({ length: data!.functions[i].creates.length as number }).map((object, j) => {
                                            return (
                                                <span key={i}>
                                                    {data.functions[i].creates[j]} {''}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* </div> */}
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
