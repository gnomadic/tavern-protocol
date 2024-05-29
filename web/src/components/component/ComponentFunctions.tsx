
"use client"

import { ComponentMetadata, ComponentMetadataFunction } from "@/domain/Domain";
import { censor } from "@/domain/utils";
import { useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useMetadata } from "@/hooks/useMetadata";
import { Address } from "viem";

type FunctionProps = {
    functions: ComponentMetadataFunction[]
}

export default function ComponentFunctions(props: FunctionProps) {


    return (
        <ul className="">
            {Array.from({ length: props.functions.length as number }).map((object, i) => {
                return (
                    <div key={i} className='justify-center pt-12'>
                        <div className='pt-5 pl-5 text-lg border-b-2 border-white'>
                            {i+1}{'/'}{props.functions[i].name}{' '}
                        </div>
                        <div className='pt-2 text-sm'>
                            {props.functions[i].description}
                        </div>

                        <div className="grid md:grid-cols-2 py-8 gap-8">
                            <div className="mx-12">
                                <div className="border-b-2 border-white text-xs ">
                                    required keys
                                </div>

                                {Array.from({ length: props.functions[i].requires.length as number }).map((object, j) => {
                                    return (
                                        <p key={j}>
                                            {props.functions[i].requires[j]} {''}
                                        </p>
                                    );
                                })}
                            </div>
                            <div className="mx-12">
                                <div className="border-b-2 border-white text-xs">
                                    created keys
                                </div>

                                {Array.from({ length: props.functions[i].creates.length as number }).map((object, j) => {
                                    return (
                                        <p key={j}>
                                            {props.functions[i].creates[j]} {''}
                                        </p>
                                    );
                                })}
                                {props.functions[i].creates.length === 0 ? <p>none</p> : <></>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </ul>


    );

}
