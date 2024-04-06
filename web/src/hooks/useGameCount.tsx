import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";

const abi = [
  {
    "type": "function",
    "name": "getGameCount",
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

const useGameCount = ({
  deploy,
  
  // enabled,
}: {
  deploy: Deployment;
  
  // enabled?: boolean | undefined;
}) => {
  const {
    data: supply,
    isError: gameCountError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: deploy.gameFactory,
    abi: abi,
    functionName: "getGameCount"
    // enabled: enabled != undefined ? enabled : true,
  });

  const [gameCount, setGameCount] = useState<string>("0");

  useEffect(() => {
    if (supply) {
      setGameCount(BigInt(supply as string).toString());
    }
  }, [supply, gameCountError, isCurSupplyLoading]);

  return { gameCount, gameCountError };
};

export default useGameCount;
