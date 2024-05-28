'use client';

import ModuleCard from '@/components/ModuleCard';
import { useReadComponentRegistryGetComponentCount, useReadComponentRegistryGetComponents } from '@/generated';
import useDeployment from '@/hooks/useDeployment';

export default function ExploreComponents() {

  const { deploy } = useDeployment();
  const { data: currentModules } = useReadComponentRegistryGetComponents({ address: deploy.componentRegistry, args: [0] })
  const { data: moduleCount } = useReadComponentRegistryGetComponentCount({ address: deploy.componentRegistry })
  
  return (
      <div className="p-24 pt-36">
            <div className='text-center text-5xl border-b-2 border-t-2 border-white py-2 uppercase'>
            {deploy.chain}{'/'}reg{'/'}{moduleCount ? moduleCount.toString() : "..."}
            </div>

      {/* <p> Explore Modules in the registry that you can use for your games on {deploy.chain}</p> */}
      {/* <p> There are {moduleCount ? moduleCount.toString() : '...'}  </p> */}

      <ul className='pb-24 pt-12'>
        {Array.from({ length: currentModules ? currentModules.length : 0 }).map((object, i) => {
          if (currentModules![i].component !== '0x0000000000000000000000000000000000000000') {
            return (
              <li key={i} className="pt-8 pb-8">
                <ModuleCard
                  // displayName={currentModules![i].displayName}
                  index={i}
                  address={currentModules![i].component}
                  metadata={currentModules![i].metadata}
                // functions={currentModules![i].functions}
                // description={currentModules![i].description}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
