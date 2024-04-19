"use client"
import { ModuleSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useCurrentModules from "@/hooks/useCurrentModules";
import useDeployment from "@/hooks/useDeployment";
import useGameSummary from "@/hooks/useGameSummary";
import { useEffect, useState } from "react";
import { Address } from "viem";


type StatsProps = {
    moduleAddress: Address
}

export default function Stats(props: StatsProps) {

    const { deploy } = useDeployment();

    const { currentModules, currentModulesError } = useCurrentModules({ deploy: deploy, pageStart: 0 })
    const [curMod, setCurMod] = useState<ModuleSummary>();

    useEffect(() => {
        if (currentModules) {
            setCurMod(currentModules.find((module) => module.module === props.moduleAddress)!);
        }
    }
        , [currentModules, props.moduleAddress]);

    // const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });


    return (
        <section id='connect' className='relative pt-36 items-center'>
            <div className="text-xl pb-8">Available Functions</div>
            <ul>
                {Array.from({ length: curMod?.functions.length as number }).map((object, i) => {
                    // {Array.from({ length: currentGames?.length }).map((object, i) => {
                    // if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
                    return (
                        <div key={i}>
                            {/* abi: {JSON.stringify(findABI(gameSummary!.availableFunctions[i].Key))} */}

                            <div className="flex">
                            <div className="mx-auto">{i + 1}. </div>
                                <div className="mx-auto">{curMod!.functions[i]}</div>
                                {/* <div className="mx-auto">hi</div> */}
                            </div>
                        </div>

                    );

                })}
            </ul>
            <div className="pt-16 text-xl pb-8">Required Data</div>
            <ul>
                {Array.from({ length: curMod?.required.length as number }).map((object, i) => {
                    // {Array.from({ length: currentGames?.length }).map((object, i) => {
                    // if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
                    return (
                        <div key={i}>
                            {/* abi: {JSON.stringify(findABI(gameSummary!.availableFunctions[i].Key))} */}

                            <div className="flex">
                                {/* <div className="mx-auto">hi</div> */}
                                <div className="mx-auto">{i + 1}. </div>

                                <div className="mx-auto">{curMod!.required[i]}</div>
                            </div>
                        </div>

                    );

                })}
            </ul>

        </section>
    );
}
