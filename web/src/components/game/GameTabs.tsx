"use client"

import { ComponentMetadata } from "@/domain/Domain";
import { censor } from "@/domain/utils";
import { useReadGameGetSummary, useReadIComponentGetSummary } from "@/generated";
import useDeployment from "@/hooks/useDeployment";
import { useMetadata } from "@/hooks/useMetadata";
import { Address } from "viem";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ComponentStats from "../component/ComponentStats";
import GameInfo from "./GameInfo";
import GMSection from "./GMSection";
import GameComponents from "./GameComponents";
import GameFlows from "./GameFlows";
import CreateGameModules from "../create/CreateGameModules";



type StatsProps = {
    gameAddress: Address
}

export default function GameTabs(props: StatsProps) {

    const { deploy } = useDeployment();
    // const { data: summary } = useReadIComponentGetSummary({ address: props.gameAddress })
    const { data: summary } = useReadGameGetSummary({ address: props.gameAddress });

    const { data } = useMetadata<ComponentMetadata>(summary?.metadata);

    return (
        <section id='connect' className='relative items-center '>
            <Tabs defaultIndex={0} className="pt-12">
                <TabList>
                    <Tab default={true} >Info</Tab>
                    <Tab>Components</Tab>
                    <Tab>Flows</Tab>
                    <Tab>Config</Tab>
                </TabList>

                <TabPanel>
                    {summary ?
                        <GameInfo gameAddress={props.gameAddress} summary={summary} />
                        :
                        <div className="py-12 md:py-24 mx-4 md:mx-12 font-outfit text-lg">
                            loading...
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    {summary ?
                        <GameComponents gameAddress={props.gameAddress} summary={summary} />
                        :
                        <div className="py-12 md:py-24 mx-4 md:mx-12 font-outfit text-lg">
                            loading...
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    <GameFlows gameAddress={props.gameAddress} />
                </TabPanel>
                <TabPanel>
                    <GMSection gameAddress={props.gameAddress} />
                </TabPanel>

            </Tabs>
        </section>
    );
}
