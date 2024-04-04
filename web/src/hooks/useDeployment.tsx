'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Deployment } from '../domain/Domain';
import { Deployments } from '../domain/deployments';

const useDeployment = () => {
  const { chain } = useAccount();
  const [deploy, setDeploy] = useState<Deployment>({
    chainellationAddress: '0x0',
    displayName: 'playmint',
    currency: 'eth',
    decoAddress: '0x0',
    chain: 'none',
  });

  useEffect(() => {
    console.log('Network Change detected to: ' + chain?.name);
    chain?.name &&
      chain.name.toLowerCase() != deploy.chainellationAddress &&
      Deployments.hasOwnProperty(chain.name.toLowerCase())
      ? setDeploy(Deployments[chain.name.toLowerCase()])
      : setDeploy(Deployments['playmint']);
  }, [chain, deploy?.chainellationAddress]);

  return { deploy };
};

export default useDeployment;
