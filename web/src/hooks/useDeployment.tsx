'use client';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useContractRead, useAccount } from 'wagmi';
import { Address, Deployment } from '../domain/Domain';
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

  // const {
  //   data: supply,
  //   isError: isCurSupplyError,
  //   isLoading: isCurSupplyLoading,
  // } = useContractRead({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "currentSupply",
  //   enabled: enabled != undefined ? enabled : true,
  // });

  // const [curSupply, setCurSupply] = useState(BigNumber.from(0));

  useEffect(() => {
    console.log('index effect: ' + chain?.name);
    chain?.name &&
    chain.name.toLowerCase() != deploy.chainellationAddress &&
    Deployments.hasOwnProperty(chain.name.toLowerCase())
      ? setDeploy(Deployments[chain.name.toLowerCase()])
      : setDeploy(Deployments['chainellation']);
  }, [chain, deploy?.chainellationAddress]);

  return { deploy };
};

export default useDeployment;
