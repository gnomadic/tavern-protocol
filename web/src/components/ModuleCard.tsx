import { GameSummary, ModuleSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { censor, pretty } from '../domain/utils';


type ModuleCardProps = {
  moduleSummary: ModuleSummary;
}

export default function ModuleCard(props: ModuleCardProps) {
  return (
    <div className='justify-center bg-slate-800'>
      <div className='text-5xl pl-5 pt-3'>
        {censor(props.moduleSummary.displayName)}
      </div>
      <div className='pt-12 pl-2 pb-2'>
        provides: {props.moduleSummary.functions}
      </div>
    </div>
  );
}
