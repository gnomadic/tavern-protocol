import Divider from '@/components/Divider';
import ComponentHeader from '@/components/component/ComponentHeader';
import Stats from '@/components/component/Stats';
import { Address } from 'viem';

export default function Module({ params }: { params: { address: string } }) {



  return (
    <main className='font-anon flex flex-col items-center justify-between p-24'>
      <ComponentHeader moduleAddress={params.address as Address} />
      <Stats moduleAddress={params.address as Address} />

      <section>
        <Divider />
      </section>
    </main>
  );
}
