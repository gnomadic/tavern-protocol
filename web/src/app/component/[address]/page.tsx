import ComponentHeader from '@/components/component/ComponentHeader';
import ComponentStats from '@/components/component/ComponentStats';
import { Address } from 'viem';

export default function Module({ params }: { params: { address: string } }) {



  return (
    <main className='items-center px-5 md:px-24 pt-40'>
      <ComponentHeader moduleAddress={params.address as Address} />
      {/* <Divider /> */}

      <ComponentStats moduleAddress={params.address as Address} />


    </main>
  );
}
