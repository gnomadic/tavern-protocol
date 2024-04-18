"use client"
import { pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import { Address } from "viem";


type HeaderProps = {
  gameAddress: Address
}

export default function Header(props: HeaderProps) {

  const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

  return (
    <section id='connect' className='relative pt-48 items-center'>
      <div className='text-8xl pb-2'>
        {gameSummary ? gameSummary.displayName : "loading"}
      </div>
      <div>
        game master: {gameSummary ? pretty(gameSummary.gm as Address) : "loading"}
      </div>
      {/* <div className='pt-4'>
      Every Game is composed of Modules and Entities.  Modules contain gameplay, and Entities contain data.
    </div> */}
    </section>
  );
}
