"use client"

import { ComponentMetadata } from "@/domain/Domain";
import { censor } from "@/domain/utils";
import { useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useMetadata } from "@/hooks/useMetadata";
import { Address } from "viem";
import ComponentFunctions from "./ComponentFunctions";

type StatsProps = {
    moduleAddress: Address
}

export default function ComponentStats(props: StatsProps) {

    const { deploy } = useDeployment();
    const { data: summary } = useReadIComponentGetSummary({ address: props.moduleAddress })
    const { data } = useMetadata<ComponentMetadata>(summary?.metadata);

    return (
        <section id='connect' className='relative items-center pt-24 pb-12'>
            {summary && data ?
                <div>
                    <div className="text-3xl uppercase">
                        {censor(data.name)}/functions/{data.gameFunctions?.length}
                    </div>
                    <ComponentFunctions functions={data.gameFunctions} />
                    <div className="text-3xl uppercase pt-20">
                        {censor(data.name)}/config/{data.configFunctions?.length}
                    </div>
                    <ComponentFunctions functions={data.configFunctions} />
                </div>
                :
                <></>}
        </section>
    );
}
