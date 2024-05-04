"use client"
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { Address } from 'viem';
import Divider from '../Divider';
import useGameSummary from '@/hooks/useGameSummary';
import {  useReadGameGetFlows } from '@/generated';


type StepThreeProps = {
    gameAddress: Address
}

export default function GameInfo(props: StepThreeProps) {
    const { gameSummary, gameSummaryError } = useGameSummary({ address: props.gameAddress });

    const { data: allFlows } = useReadGameGetFlows();


    return (
        <section>

            <section className='py-18'>
                <Divider />
            </section>
            {/* <div> Your Game is at: {gameSummary?.game} </div> */}
            <div className='pt-4'> This game offers the following Flows:</div>
            <ul>
                {Array.from({ length: allFlows?.length ?? 0 }).map((object: any, i) => {
                    return <li className='pt-2' key={i}>
                        <p>name:  {allFlows![i]}</p>
                        {/* <p>address:  {gameSummary!.availableFunctions[i].Address}</p> */}
                        {/* <p>function Name:  {gameSummary!.availableFunctions[i].Key}</p> */}
                    </li>

                })}
            </ul>

            <div className='pt-4'> Your game offers the following character stats at the following addresses:</div>
            <ul>
                {Array.from({ length: gameSummary?.availableData.length ?? 0 }).map((object: any, i) => {
                    return <li className='pt-2' key={i}>
                        <p>address:  {gameSummary!.availableData[i].value}</p>
                        <p>function Name:  {gameSummary!.availableData[i].name}</p>
                    </li>

                })}
            </ul>
        </section >
    );
}
