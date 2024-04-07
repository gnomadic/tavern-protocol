"use client"
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { Address } from 'viem';
import { BaseError } from 'viem/_types';
import Divider from '../Divider';
import useGameSummary from '@/hooks/useGameSummary';




type StepThreeProps = {
  gameAddress: Address
}

export default function StepThree(props: StepThreeProps) {
  const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

  return (
    <section>

      <div className='pt-36'>
        Step 3: All set!  Once those two transactions are done, you can reload the page!
      </div>
      <section className='pt-24'>
        <Divider />
      </section>
      <div> Your Game is at: {gameSummary?.game} </div>
      <div className='pt-4'> Your game offers the following functions at the following addresses: </div>
      <ul>
        {Array.from({ length: gameSummary?.availableFunctions.length }).map((object: any, i) => {
          return <li className='pt-2' key={i}>
            <p>address:  {gameSummary.availableFunctions[i].Address}</p>
            <p>function Name:  {gameSummary.availableFunctions[i].Key}</p>
          </li>

        })}
      </ul>

      <div className='pt-4'> Your game offers the following character stats at the following addresses:</div>
      <ul>
        {Array.from({ length: gameSummary?.availableData.length }).map((object: any, i) => {
          return <li className='pt-2' key={i}>
            <p>address:  {gameSummary.availableData[i].Address}</p>
            <p>function Name:  {gameSummary.availableData[i].Key}</p>
          </li>

        })}
      </ul>
    </section >
  );
}
