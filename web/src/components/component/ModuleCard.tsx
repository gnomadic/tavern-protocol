import { useMetadata } from '@/hooks/useMetadata';
import { censor, pretty } from '../../domain/utils';
import Link from 'next/link';
import { Address } from 'viem';
import { ComponentMetadata } from '@/domain/Domain';


type ModuleCardProps = {
  // displayName: string;
  address: Address;
  // functions: readonly string[]
  // description: string;
  metadata: string;
  index: number;
}

export default function ModuleCard(props: ModuleCardProps) {
  const { data } = useMetadata<ComponentMetadata>(props.metadata);

  return (
    <div className='border-2 border-gray-500'>
      <Link href={`/component/${props.address}`}>
        <div className='border-b-2 border-white text-2xl pl-4 py-2'>
          {props.index + 1}{"/"}{data ? censor(data.name) : "loading"}
        </div>
        <div className='pt-5 pb-2 pl-2 text-sm'>
          {censor(data?.description)}
        </div>
      </Link>
    </div>
  );
}
