import Divider from '@/components/Divider';
import ComponentHeader from '@/components/component/ComponentHeader';
import ComponentStats from '@/components/component/ComponentStats';
import { Address } from 'viem';

export default function Module({ params }: { params: { address: string } }) {



  return (
    <main className='flex flex-col p-24 font-anon'>
      <ComponentHeader moduleAddress={params.address as Address} />
      <ComponentStats moduleAddress={params.address as Address} />

      <section>
        <Divider />
      </section>
    </main>
  );
}
