import { useMetadata } from '@/hooks/useMetadata';
import { censor, pretty } from '../domain/utils';
import Link from 'next/link';
import { Address } from 'viem';
import { ComponentMetadata } from '@/domain/Domain';


type ModuleCardProps = {
  // displayName: string;
  address: Address;
  // functions: readonly string[]
  // description: string;
  metadata:string;
}

export default function ModuleCard(props: ModuleCardProps) {
  const { data } = useMetadata<ComponentMetadata>(props.metadata);

  return (
    <Link href={`/module/${props.address}`}>
      <div className='justify-center border-2 border-gray-300 rounded-md bg-slate-800'>
        <div className='pt-5 pl-8 text-2xl'>
          {data ? censor(data.name) : "loading"}
        </div>
        <div className='pt-5 pb-2 pl-2 text-sm'>
          {censor(data?.description)}
        </div>
        {/* <ul>
          {Array.from({ length: props.functions.length as number }).map((object, i) => {

            return (
              <div key={i}>

                <div className="px-12">{props.functions[i]}</div>
              </div>

            );

          })}
        </ul> */}


      </div>
    </Link>
  );
}
