'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Deployment } from '../domain/Domain';
import { Deployments } from '../domain/deployments';

const useDeployment = () => {
  const { chain } = useAccount();
  const [deploy, setDeploy] = useState<Deployment>(Deployments['playmint']);

  useEffect(() => {
    console.log('Network Change detected to: ' + chain?.name);
    chain?.name &&
      chain.name.toLowerCase() != deploy.gameFactory &&
      Deployments.hasOwnProperty(chain.name.toLowerCase())
      ? setDeploy(Deployments[chain.name.toLowerCase()])
      : setDeploy(Deployments['playmint']);
  }, [chain, deploy?.gameFactory]);

  return { deploy };
};

export default useDeployment;
