
"use client"

import { ComponentMetadata, ComponentMetadataFunction } from "@/domain/Domain";
import { censor } from "@/domain/utils";
import { useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useMetadata } from "@/hooks/useMetadata";
import { Address } from "viem";

type StepCardProps = {
    title: string,
    description: string
}

export default function StepCard(props: StepCardProps) {


    return (
        <div>
            <div className='border-b-2 border-white text-2xl text-end pb-2'>
                {props.title}
            </div>
            <div className="pt-4">
                {props.description}
            </div>
        </div>
    );
}
