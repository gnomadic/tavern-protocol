import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";

const abi = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "startAt",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "getGames",
    "outputs": [
      {
        "internalType": "struct GameFactory.GameSummary[10]",
        "name": "result",
        "type": "tuple[10]",
        "components": [
          {
            "internalType": "address",
            "name": "game",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "gm",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "displayName",
            "type": "string"
          }
        ]
      }
    ]
  },
];

const useCurrentGames = ({
  contractAddress,
  pageStart,
  // enabled,
}: {
  contractAddress: Address;
  pageStart: number;
  // enabled?: boolean | undefined;
}) => {
  const {
    data: supply,
    isError: isCurSupplyError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getGames",
    args: [
      pageStart
    ]
    // enabled: enabled != undefined ? enabled : true,
  });

  const [curSupply, setCurSupply] = useState();

  useEffect(() => {
    if (supply) {
      setCurSupply(supply);
    }
  }, [supply]);

  return { curSupply, isCurSupplyError };
};

export default useCurrentGames;
