'use client';

import ModuleCard from '@/components/ModuleCard';
import { useReadComponentRegistryGetComponentCount, useReadComponentRegistryGetComponents } from '@/generated';
import useDeployment from '@/hooks/useDeployment';

export default function ExploreComponents() {

  const { deploy } = useDeployment();
  const { data: moduleCount } = useReadComponentRegistryGetComponentCount({ address: deploy.componentRegistry })
  const { data: currentModules } = useReadComponentRegistryGetComponents({ address: deploy.componentRegistry, args: [0] })

  return (
    <div className="md:pt-12 pb-24">
      <div className='text-4xl md:text-5xl lg:text-6xl uppercase'>
        {deploy.chain}{'/'}LIB{'/'}{moduleCount ? moduleCount.toString() : "..."}
      </div>

      {/* <p> Explore Modules in the registry that you can use for your games on {deploy.chain}</p> */}
      {/* <p> There are {moduleCount ? moduleCount.toString() : '...'}  </p> */}

      <ul className=''>
        {Array.from({ length: currentModules ? currentModules.length : 0 }).map((object, i) => {
          if (currentModules![i].component !== '0x0000000000000000000000000000000000000000') {
            return (
              <li key={i} className="pt-8">
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
