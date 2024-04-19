import { GameSummary, ModuleSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { censor, pretty } from '../domain/utils';
import Link from 'next/link';


type ModuleCardProps = {
  moduleSummary: ModuleSummary;
}

export default function ModuleCard(props: ModuleCardProps) {

  console.log('moduleSummary', props.moduleSummary)
  return (
    <Link href={`/module/${props.moduleSummary.module}`}>
      <div className='justify-center bg-slate-800'>
        <div className='text-5xl pl-5 pt-3'>
          {censor(props.moduleSummary.displayName)}
        </div>
        <div className='pt-12 pl-2 pb-2'>
          provides: 
        </div>
        <ul>
          {Array.from({ length: props.moduleSummary?.functions.length as number }).map((object, i) => {
            // {Array.from({ length: currentGames?.length }).map((object, i) => {
            // if (currentGames[i].game !== '0x0000000000000000000000000000000000000000') {
            return (
              <div key={i}>
                {/* abi: {JSON.stringify(findABI(gameSummary!.availableFunctions[i].Key))} */}

                {/* <div className="flex"> */}
                  
                  <div className="px-12">{props.moduleSummary!.functions[i]}</div>
                  {/* <div className="mx-auto">hi</div> */}
                {/* </div> */}
              </div>

            );

          })}
        </ul>


      </div>
    </Link>
  );
}
