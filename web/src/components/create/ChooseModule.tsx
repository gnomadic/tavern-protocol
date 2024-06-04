import { useMetadata } from '@/hooks/useMetadata';
import Link from 'next/link';
import { Address } from 'viem';
import { ComponentMetadata } from '@/domain/Domain';
import { censor } from '@/domain/utils';


type ModuleCardProps = {
  // displayName: string;
  address: Address;
  // functions: readonly string[]
  // description: string;
  metadata: string;
  index: number;
  selected: Address[];
  setSelected: (selected: Address) => void;

}

export default function ChooseModule(props: ModuleCardProps) {
  const { data } = useMetadata<ComponentMetadata>(props.metadata);

  const cardClass = props.selected.includes(props.address) ? ' border-2 border-blue-300' : ' border-2 border-gray-500';
  const textClass = props.selected.includes(props.address) ? ' text-white' : ' text-gray-500';

  return (
    <div 
    className={'border-2 ' + cardClass + textClass}
    onClick={() => props.setSelected(props.address)}
    >
      {/* <Link href={`/component/${props.address}`}> */}
        <div 
        className='border-b-2 border-white text-2xl pl-4 py-2 active:border-blue-500'
        >
          {props.index + 1}{"/"}{data ? censor(data.name) : "loading"}
        </div>
        <div className='pt-5 pb-2 pl-2 text-sm'>
          {censor(data?.description)}
        </div>
        {/* <div>wat:{props.selected.includes(props.address).toString()}</div>
        <div>wat:{props.selected}</div> */}
      {/* </Link> */}
    </div>
  );
}
