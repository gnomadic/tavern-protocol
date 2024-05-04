"use client"
import { pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import { Address } from "viem";
import useDeployment from '@/hooks/useDeployment';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';


type HeaderProps = {
  gameAddress: Address
}

export default function Header(props: HeaderProps) {

  const {deploy} = useDeployment();

  const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

  return (
    <section id='connect' className='relative items-center pt-48'>
      <div className='pb-2 text-8xl'>
        {gameSummary ? gameSummary.displayName : "loading"}
      </div>
      <div>
        game master: {gameSummary ? pretty(gameSummary.gm as Address) : "loading"}
      </div>
      <div>
        
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={deploy.scan + gameSummary?.game} >
          game contract: {gameSummary ? pretty(gameSummary.game as Address) : "loading"}
          <ArrowUpRightIcon
                      className="w-4 h-4 mb-1"
                      style={{ display: "inline" }}
                    />
        </a>
      </div>
      {/* <div className='pt-4'>
      Every Game is composed of Modules and Entities.  Modules contain gameplay, and Entities contain data.
    </div> */}
    </section>
  );
}
