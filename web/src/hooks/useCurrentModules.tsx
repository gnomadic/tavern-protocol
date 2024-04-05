import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";

const abi = [
  {
    "type": "function",
    "name": "getModules",
    "inputs": [
      {
        "name": "startAt",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "tuple[10]",
        "internalType": "struct ModuleSummary[10]",
        "components": [
          {
            "name": "module",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "functions",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "required",
            "type": "string[]",
            "internalType": "string[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
];


const useCurrentModules = ({
  deploy,
  pageStart,
  // enabled,
}: {
  deploy: Deployment;
  pageStart: number;
  // enabled?: boolean | undefined;
}) => {
  const {
    data: supply,
    isError: currentModulesError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: deploy.moduleRegistry,
    abi: abi,
    functionName: "getModules",
    args: [
      pageStart
    ]
    // enabled: enabled != undefined ? enabled : true,
  });

  const [currentModules, setCurrentModules] = useState<any>();

  useEffect(() => {
    if (supply) {
      setCurrentModules(supply);
    }
  }, [supply]);

  return { currentModules, currentModulesError };
};

export default useCurrentModules;
