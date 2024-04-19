import Divider from '@/components/Divider';
import Header from '@/components/module/Header';
import Stats from '@/components/module/Stats';
import { Address } from 'viem';

export default function Module({ params }: { params: { address: string } }) {



  return (
    <main className='font-anon flex flex-col items-center justify-between p-24'>
      <Header moduleAddress={params.address as Address} />
      <Stats moduleAddress={params.address as Address} />

      <section>
        <Divider />
      </section>
    </main>
  );
}
