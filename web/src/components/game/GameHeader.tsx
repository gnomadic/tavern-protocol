"use client"
import { pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import { Address } from "viem";
import useDeployment from '@/hooks/useDeployment';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { useReadGameGetSummary } from "@/generated";


type HeaderProps = {
  gameAddress: Address
}

export default function GameHeader(props: HeaderProps) {

  const {deploy} = useDeployment();

  // const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });
  const {data: summary} = useReadGameGetSummary({address: props.gameAddress});

  return (

    <section id='connect' className='relative items-start pt-48 pb-12 min-w-screen'>
      <div className='pb-2 text-4xl lg:text-8xl'>
        {!summary ? "loading" :
          <div>
            <div className="text-xl">
              the game
            </div>
            <div>
              {summary.displayName}
            </div>
            {/* <div className="text-xl">
              component
            </div> */}
            <div className="pt-12 text-sm">
              is deployed at: {' '}
              <a target="_blank"
                rel="noopener noreferrer"
                href={deploy.scan + props.gameAddress} >
                {pretty(props.gameAddress)}
                <span>
              <ArrowUpRightIcon
                className="w-4 h-4 mb-1"
                style={{ display: "inline" }} />
            </span>
              </a>
            </div>
            <div className="pt-12 text-sm">
               {summary.description}
            </div>
          </div>
        }
      </div>
    </section>




    // <section id='connect' className='relative items-center pt-48'>
    //   <div className='pb-2 text-8xl'>
    //     {gameSummary ? gameSummary.displayName : "loading"}
    //   </div>
    //   <div>
    //     game master: {gameSummary ? pretty(gameSummary.gm as Address) : "loading"}
    //   </div>
    //   <div>
        
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href={deploy.scan + gameSummary?.game} >
    //       game contract: {gameSummary ? pretty(gameSummary.game as Address) : "loading"}
    //       <ArrowUpRightIcon
    //                   className="w-4 h-4 mb-1"
    //                   style={{ display: "inline" }}
    //                 />
    //     </a>
    //   </div>
    // </section>
  );
}
