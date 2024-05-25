import { Deployment, GameMetadata, GameSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { censor, pretty } from '../domain/utils';
import Link from 'next/link';
import { Address } from 'viem';
import { useReadGameMetadata } from '@/generated';
import { useMetadata } from '@/hooks/useMetadata';



type GameCardProps = {
  deployment: Deployment;
  metadata: string;
  gm: Address;
  address: Address;
  index: number;
}


export default function GameCard(props: GameCardProps) {
  const { data } = useMetadata<GameMetadata>(props.metadata);

  return (
    <Link href={`/game/${props.deployment.chainId}/${props.address}`}>
      {/* <div className=''> */}
 
      <div className='pt-5 pl-5 text-lg border-b-2 border-white'>
          {props.index + 1}{"/"}{data ? censor(data.name) : "loading"}
        </div>
        <div className='text-right pb-2 pl-4 text-xs'>
          created by: {pretty(props.gm)}
        </div>
        <div className='pt-5 pb-2 pl-2 text-sm'>
          {data && data.description.length > 0 ? censor(data?.description) : "No description available"}
        </div>
      {/* </div> */}
    </Link>
  );
}
