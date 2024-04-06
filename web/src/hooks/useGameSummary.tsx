import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";
import { GameABI } from "@/domain/abi/Game";

const abix = [
  {
    "type": "function",
    "name": "getSummary",
    "inputs": [],
    "outputs": [
        {
            "name": "",
            "type": "tuple",
            "internalType": "struct GameSummary",
            "components": [
                {
                    "name": "game",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "gm",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "displayName",
                    "type": "string",
                    "internalType": "string"
                }
            ]
        }
    ],
    "stateMutability": "view"
},
];

const useGameSummary = ({
  address,
  // pageStart,
  // enabled,
}: {
  address: Address;
  // pageStart: number;
  // enabled?: boolean | undefined;
}) => {
  const {
    data,
    isError: gameSummaryError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: address,
    abi: GameABI,
    functionName: "getSummary",
    // enabled: enabled != undefined ? enabled : true,
  });

  const [gameSummary, setGameSummary] = useState<any>();

  useEffect(() => {
    if (data) {
      setGameSummary(data);
    }
  }, [data]);

  return { gameSummary, gameSummaryError };
};

export default useGameSummary;
