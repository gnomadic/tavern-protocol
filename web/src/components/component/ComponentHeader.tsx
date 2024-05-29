"use client"
import { ComponentMetadata, ComponentSummary } from "@/domain/Domain";
import { censor, pretty } from "@/domain/utils";
import useDeployment from "@/hooks/useDeployment";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadIComponentGetSummary } from '@/generated';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { useMetadata } from "@/hooks/useMetadata";

type HeaderProps = {
  moduleAddress: Address
}

export default function ComponentHeader(props: HeaderProps) {

  const { deploy } = useDeployment();
  const { data: summary } = useReadIComponentGetSummary({ address: props.moduleAddress })
  const { data } = useMetadata<ComponentMetadata>(summary?.metadata);

  return (
    <section id='connect' className='relative items-start pt-24 min-w-screen'>
      <div className='pb-2'>
        {!summary || !data ? "loading" :
          <div>
            <div className='text-4xl md:text-5xl lg:text-6xl uppercase border-b-2 border-white'>
              {deploy.chain}{'/'}reg{'/'}{data ? censor(data.name) : "loading"}
            </div>
            <div className='text-right pb-2 pl-4 text-xs'>
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
         
            <div className="text-base pt-6">
              {data.description}
            </div>
            
          </div>
        }
      </div>
    </section>
  );
}
