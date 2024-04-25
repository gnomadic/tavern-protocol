"use client"
import { ComponentSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useDeployment from "@/hooks/useDeployment";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadComponentRegistryGetModules } from '@/generated';


type HeaderProps = {
  moduleAddress: Address
}

export default function Header(props: HeaderProps) {

  const { deploy } = useDeployment();

  const [curMod, setCurMod] = useState<ComponentSummary>();
  const { data: currentModules } = useReadComponentRegistryGetModules({ address: deploy.moduleRegistry, args: [0] })


  useEffect(() => {
    if (currentModules) {
      setCurMod(currentModules.find((component) => component.component === props.moduleAddress)!);
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
