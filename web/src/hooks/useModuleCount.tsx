import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";

const abi = [
  {
    "type": "function",
    "name": "getModuleCount",
    "inputs": [],
    "outputs": [
        {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
},
];

const useModuleCount = ({
  deploy,
  
  // enabled,
}: {
  deploy: Deployment;
  // enabled?: boolean | undefined;
}) => {
  const {
    data: supply,
    isError: moduleCountError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: deploy.moduleRegistry,
    abi: abi,
    functionName: "getModuleCount"
    // enabled: enabled != undefined ? enabled : true,
  });

  const [moduleCount, setModuleCount] = useState<string>("0");

  useEffect(() => {
    if (supply) {
      setModuleCount(BigInt(supply as string).toString());
    }
  }, [supply]);

  return { moduleCount, moduleCountError };
};

export default useModuleCount;
