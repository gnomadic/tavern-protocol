"use client"
import { Address } from 'viem';
import Divider from '../Divider';
import { useReadGameFlows, useReadGameGetFlows, useReadGameGetSummary } from '@/generated';
import { useMetadata } from '@/hooks/useMetadata';
import { GameMetadata, GameSummary } from '@/domain/Domain';
import { censor, pretty } from '@/domain/utils';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import useDeployment from '@/hooks/useDeployment';
import SmallTitle from '../base/SmallTitle';
import ModuleCard from '../ModuleCard';


type StepThreeProps = {
    gameAddress: Address
}

export default function GameInfo(props: StepThreeProps) {

    const { data: summary } = useReadGameGetSummary({ address: props.gameAddress });
    const { data: flows } = useReadGameFlows({ address: props.gameAddress, args: ["playRPS", BigInt(0)] });
    const { data } = useMetadata<GameMetadata>(summary?.metadata);
    const { deploy } = useDeployment();


    return (

        <section id='connect' className='relative items-center px-6 md:px-24 pt-24 pb-12'>
            <section>
                <SmallTitle title={'components/' + summary?.components.length} />
                {/* <div>{JSON.stringify(summary)}</div> */}
                <ul>
                    {Array.from({ length: summary?.components.length as number }).map((object, i) => {
                        return (
                            <li key={i} className="pt-8 pb-8">
                                <ModuleCard
                                    index={i}
                                    address={summary?.componentSummaries[i].component!}
                                    metadata={summary?.componentSummaries[i].metadata!}
                                />
                            </li>

                        );
                    })}
                </ul>
            </section>




            <section>
                <SmallTitle title={'data/' + summary?.availableData.length} />
                <ul>
                    {Array.from({ length: summary?.availableData.length as number }).map((object, i) => {
                        return (
                            <li key={i} className="pt-8 pb-8">
                                <div>{summary?.availableData[i].name}</div>
                            </li>

                        );
                    })}
                </ul>

            </section>









            <section>
                <SmallTitle title={'flows/' + summary?.flows.length} />
                <ul>
                    {Array.from({ length: summary?.flows.length as number }).map((object, i) => {
                        return (
                            <div key={i} className='justify-center pt-12'>
                                <div className='pt-5 pl-5 text-lg border-b-2 border-white'>
                                    {i + 1}{'/'}{summary!.flows[i].name}{' '}
                                </div>

                                <div className="mx-12 py-8">
                                    <div className="border-b-2 border-white text-xs ">
                                        component function
                                    </div>

                                    {Array.from({ length: summary!.flows[i].values.length as number }).map((object, j) => {
                                        return (
                                            <p key={j}>
                                                {j + 1}/
                                                <span>
                                                    <a target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={deploy.scan + summary!.flows[i].values[j].value} >
                                                        {pretty(summary!.flows[i].values[j].value)}
                                                        <span>
                                                            <ArrowUpRightIcon
                                                                className="w-4 h-4 mb-1"
                                                                style={{ display: "inline" }} />
                                                        </span>
                                                    </a>
                                                </span>
                                                /{summary!.flows[i].values[j].name} {''}
                                            </p>
                                        );
                                    })}
                                </div>

                            </div>
                        );
                    })}
                </ul>
            </section>
        </section>

    );
}
