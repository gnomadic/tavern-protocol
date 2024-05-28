"use client"
import { censor, pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import { Address } from "viem";
import useDeployment from '@/hooks/useDeployment';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { useReadGameGetSummary } from "@/generated";
import { useMetadata } from "@/hooks/useMetadata";
import { GameMetadata } from "@/domain/Domain";


type HeaderProps = {
  gameAddress: Address
}

export default function GameHeader(props: HeaderProps) {

  const { deploy } = useDeployment();

  // const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
  const { data: summary } = useReadGameGetSummary({ address: props.gameAddress });
  const { data } = useMetadata<GameMetadata>(summary?.metadata);

  return (

    <section id='connect' className='relative items-start pt-24 min-w-screen'>

      <div className='pb-2'>
        {!summary || !data ? "loading" :
          <div>
            <div className='text-4xl md:text-5xl lg:text-6xl uppercase border-b-2 border-white'>
              {deploy.chain}{'/'}game{'/'}{data ? censor(data.name) : "loading"}
            </div>
            <div>

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

            <div className="text-base pt-6">
              {data.description}
            </div>

          </div>
        }
      </div>
    </section>
  );
}
