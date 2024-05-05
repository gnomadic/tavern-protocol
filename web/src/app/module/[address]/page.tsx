import Divider from '@/components/Divider';
import ComponentHeader from '@/components/component/ComponentHeader';
import ComponentStats from '@/components/component/ComponentStats';
import { Address } from 'viem';

export default function Module({ params }: { params: { address: string } }) {



  return (
    <main className='flex flex-col px-24 pt-8 font-anon'>
      <ComponentHeader moduleAddress={params.address as Address} />

      <Divider />

      <ComponentStats moduleAddress={params.address as Address} />


    </main>
  );
}
