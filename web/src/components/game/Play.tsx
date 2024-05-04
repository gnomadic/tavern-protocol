"use client"
import { pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import useArbitraryFunction from "@/mutations/useArbitraryFunction";
import { Address } from "viem";
import ArbitraryActionButton from "./ArbitraryActionButton";
import { findABI } from "@/domain/abi/Play";
import { GameSummary } from "@/domain/Domain";
import ArbitraryDataView from "./ArbitraryDataView";


type PlayProps = {
  gameAddress: Address
}

export default function Play(props: PlayProps) {

  const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

  return (
    <section id='connect' className='relative items-center pt-8'>
      <div className='pb-8 text-xl'>

        <ul>
          {Array.from({ length: gameSummary?.availableData.length as number }).map((object, i) => {
            // {Array.from({ length: currentGames?.length }).map((object, i) => {
            // if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
            return (
              <div key={i}>
                {/* abi: {JSON.stringify(findABI(gameSummary!.availableFunctions[i].Key))} */}

                <ArbitraryDataView
                  addresskey={gameSummary!.availableData[i]}
                />
              </div>

            );

          })}
        </ul>

        <ul>

          {/* {Array.from({ length: gameSummary?.availableFunctions.length }).map((object, i) => {
          return (<li key={i}>
            {gameSummary?.availableFunctions[i].Key}
          </li>)
        })} */}


          {Array.from({ length: gameSummary?.availableFunctions.length as number }).map((object, i) => {
            // {Array.from({ length: currentGames?.length }).map((object, i) => {
            // if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
            return (
              <div key={i}>
                {/* abi: {JSON.stringify(findABI(gameSummary!.availableFunctions[i].Key))} */}

                <ArbitraryActionButton

                  abi={findABI(gameSummary!.availableFunctions[i].name)!}
                  functionName={gameSummary!.availableFunctions[i].name}
                  args={[gameSummary!.game, 0]}
                  contractAddress={gameSummary!.availableFunctions[i].value}

                />
              </div>

            );

          })}

        </ul>




      </div>


    </section>
  );
}
