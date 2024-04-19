"use client"
import { ModuleSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useCurrentModules from "@/hooks/useCurrentModules";
import useDeployment from "@/hooks/useDeployment";
import useGameSummary from "@/hooks/useGameSummary";
import { useEffect, useState } from "react";
import { Address } from "viem";


type HeaderProps = {
  moduleAddress: Address
}

export default function Header(props: HeaderProps) {

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
    <section id='connect' className='relative pt-48 items-center'>
      <div className='text-8xl pb-2'>
        {curMod ? curMod.displayName : "loading"}
      </div>

      {/* <div className='pt-4'>
      Every Game is composed of Modules and Entities.  Modules contain gameplay, and Entities contain data.
    </div> */}
    </section>
  );
}
