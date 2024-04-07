import { Deployment, GameSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { censor, pretty } from '../domain/utils';
import Link from 'next/link';


type GameCardProps = {
  gameSummary: GameSummary;
  deployment: Deployment;
}

export default function GameCard(props: GameCardProps) {
  return (
    <Link href={`/game/${props.deployment.chainId}/${props.gameSummary.gameAddress}`}>

    <div className='justify-center bg-slate-800'>
      <div className='text-5xl pl-5 pt-3'>
        {censor(props.gameSummary.displayName)}
      </div>
      <div className='pt-12 pl-2 pb-2'>
        created by: {pretty(props.gameSummary.gm)}
      </div>
    </div>
    </Link>
  );
}
