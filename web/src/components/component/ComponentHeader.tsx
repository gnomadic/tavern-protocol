"use client"
import { ComponentMetadata, ComponentSummary } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
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
    <section id='connect' className='relative items-start pt-48 pb-12 min-w-screen'>
      <div className='pb-2 text-4xl lg:text-8xl'>
        {!summary || !data ? "loading" :
          <div>
            <div className="text-xl">
              the
            </div>
            <div>
              {data.name}
            </div>
            <div className="text-xl">
              component
            </div>

            <div className="text-sm pt-12">
              can be used to
            </div>
            <div className=" text-xl">
              {data.description}
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
    </section>
  );
}
