import { GameSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';


type GameCardProps = {
  gameSummary: GameSummary;
}

export default function GameCard(props: GameCardProps) {
  return (
    <div className='justify-center'>
      <div>
        {props.gameSummary.displayName}
      </div>
    </div>
  );
}
