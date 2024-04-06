import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";
import { GameFactoryABI } from "@/domain/abi/GameFactory";

const abix = [
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
    isError: currentGamesError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: deploy.gameFactory,
    abi: GameFactoryABI,
    functionName: "getGames",
    args: [
      pageStart
    ]
    // enabled: enabled != undefined ? enabled : true,
  });

  const [currentGames, setCurrentGames] = useState<any>();

  useEffect(() => {
    if (supply) {
      setCurrentGames(supply);
    }
  }, [supply]);

  return { currentGames, currentGamesError };
};

export default useCurrentGames;