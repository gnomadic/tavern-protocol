import ChainTitle from '@/components/base/ChainTitle';
import CreateForm from '@/components/create/CreateFormOld';
import TwoPaneCreate from '@/components/create/TwoPaneCreate';

export default function Create() {

  return (

    <main className=' font-signika'>
<TwoPaneCreate/>
  </main>

    
    // <main className='items-center py-12 md:py-24 font-anon'>
    //   <section className='min-w-full pt-36'>
    //     <ChainTitle title='Create' />
    //   </section>

    //   <section id='intro' className='items-center p-12 md:p-24'>
    //     <div className='flex'>
    //       <div className='justify-right md:w-1/2'></div>
    //       <div className='justify-right md:w-1/2 '>
    //         <p>
    //           Launch an onchain game for your community without writing a line of code.
    //           <br />
    //           <br />
    //           Gameplay is created by choosing the components you want.  Components are in the registry.
    //           <br />
    //           <br />
    //           After your game is created you can visit the Game Page and manage your component,
    //           set customization options, and create your Flows.
    //           <br />
    //           <br />
    //           Flows are how players will interact with your game.
    //           When you create a flow you choose the game functions on your selected components to chain together,
    //           and the flow will execute them in order.
    //           Note every component game function has inputs and outputs, allowing data to be passed around.

    //         </p>
    //       </div>

    //     </div>
    //   </section>
    //   <section>
    //     <CreateForm />
    //   </section>
    // </main>
  );
}
