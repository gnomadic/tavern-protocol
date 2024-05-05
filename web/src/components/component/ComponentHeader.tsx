"use client"
import { ComponentSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useDeployment from "@/hooks/useDeployment";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadComponentRegistryGetModules } from '@/generated';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

type HeaderProps = {
  moduleAddress: Address
}

export default function ComponentHeader(props: HeaderProps) {

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
    <section id='connect' className='relative items-start pt-48 min-w-screen'>
      <div className='pb-2 text-4xl lg:text-8xl'>
        {!curMod ? "loading" :
          <div>
            <div className="text-xl">
              the
            </div>
            <div>
              {curMod.displayName}
            </div>
            <div className="text-xl">
              component
            </div>
            <div className="pt-12 text-sm">
              is deployed at: {' '}
              <a target="_blank"
                rel="noopener noreferrer"
                href={deploy.scan + props.moduleAddress} >
                {pretty(props.moduleAddress)}
                <span>
              <ArrowUpRightIcon
                className="w-4 h-4 mb-1"
                style={{ display: "inline" }} />
            </span>
              </a>
            </div>
          </div>
        }
      </div>

      {/* <div className='pt-4'>
      Every Game is composed of Modules and Entities.  Modules contain gameplay, and Entities contain data.
    </div> */}
    </section>
  );
}
