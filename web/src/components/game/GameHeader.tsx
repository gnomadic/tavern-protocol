"use client"
import { censor, pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import { Address } from "viem";
import useDeployment from '@/hooks/useDeployment';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { useReadGameGetSummary } from "@/generated";
import { useMetadata } from "@/hooks/useMetadata";
import { GameMetadata } from "@/domain/Domain";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import BigTitle from "../base/BigTitle";
import ChainTitle from "../base/ChainTitle";
import Explore from "@/app/explore/page";


type HeaderProps = {
  gameAddress: Address
}

export default function GameHeader(props: HeaderProps) {

  const { deploy } = useDeployment();

  // const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
  const { data: summary, error: summaryError} = useReadGameGetSummary({ address: props.gameAddress });
  const { data, error: metaError } = useMetadata<GameMetadata>(summary?.metadata);


  useEffect(() => {
    if (summaryError) {
      toast.error(summaryError.message);
    }
    if (metaError) {
      toast.error(metaError.message);
    }
  }
  , [summaryError, metaError]);


  return (
    <section id='connect' className='relative items-start min-w-screen py-12 md:py-24'>

      <div className='pb-2 pt-36'>
        {!summary || !data ? "loading" :

          <div>
            <ChainTitle title={data ? censor(data.name) : "loading"} />
            {/* <div className="text-xs pl-4">
            {deploy.chain}
            </div>
            <section className=' min-w-full'>
              <div className='uppercase text-7xl md:text-9xl border-t-2 border-b-2 border-white text-center '>
                {data ? censor(data.name) : "loading"}
              </div>
            </section> */}
            {/* <div className='text-4xl md:text-5xl lg:text-6xl uppercase border-b-2 border-white'>
              {deploy.chain}{'/'}game{'/'}{data ? censor(data.name) : "loading"}
            </div> */}
            <div className="px-6 md:px-24">

              <div className='text-right pb-2 pl-4 text-xs'>
                <div>
                  <a target="_blank"
                    rel="noopener noreferrer"
                    href={data.gameUrl} >
                    play at: {data.gameUrl}
                    <span>
                      <ArrowUpRightIcon
                        className="w-4 h-4 mb-1"
                        style={{ display: "inline" }} />
                    </span>
                  </a>
                </div>
                <div>
                  <a target="_blank"
                    rel="noopener noreferrer"
                    href={deploy.scan + props.gameAddress} >
                    deployed at: {pretty(props.gameAddress)}
                    <span>
                      <ArrowUpRightIcon
                        className="w-4 h-4 mb-1"
                        style={{ display: "inline" }} />
                    </span>
                  </a>
                </div>
                <div>
                  <a target="_blank"
                    rel="noopener noreferrer"
                    href={deploy.scan + summary.gm} >
                    gm: {pretty(summary.gm)}
                    <span>
                      <ArrowUpRightIcon
                        className="w-4 h-4 mb-1"
                        style={{ display: "inline" }} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-base pt-12 px-6 md:px-24">
              {data.description}
            </div>

          </div>
        }
      </div>
    </section>
  );
}
