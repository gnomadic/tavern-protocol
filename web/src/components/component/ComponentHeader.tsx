"use client"
import { ComponentSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useDeployment from "@/hooks/useDeployment";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadComponentRegistryGetModules, useReadIComponentGetSummary } from '@/generated';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

type HeaderProps = {
  moduleAddress: Address
}

export default function ComponentHeader(props: HeaderProps) {

  const { deploy } = useDeployment();
  const {data: summary} = useReadIComponentGetSummary({address: props.moduleAddress})

  return (
    <section id='connect' className='relative items-start pt-48 pb-12 min-w-screen'>
      <div className='pb-2 text-4xl lg:text-8xl'>
        {!summary ? "loading" :
          <div>
            <div className="text-xl">
              the
            </div>
            <div>
              {summary.displayName}
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
            <div className="pt-12 text-xl">
               {summary.description}
            </div>
          </div>
        }
      </div>
    </section>
  );
}
