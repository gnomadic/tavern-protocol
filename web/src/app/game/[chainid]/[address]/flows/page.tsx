import CreateFlow from "@/components/create/flows/CreateFlow";

  export default function Create({ params }: { params: { address: string, chainid: string } }) {

  return (

    <main className=' font-signika'>
      <CreateFlow
        address={params.address}
        chainid={params.chainid}
        />
    </main>

  );
}
