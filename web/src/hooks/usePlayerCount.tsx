import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";

const abi = [
  {
    "type": "function",
    "name": "getPlayerCount",
    "inputs": [
        {
            "name": "game",
            "type": "address",
            "internalType": "contract IGame"
        }
    ],
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

const usePlayerCount = ({
  moduleAddress,
  gameAddress
  
  // enabled,
}: {
  moduleAddress: Address;
  gameAddress: Address;
  
  // enabled?: boolean | undefined;
}) => {
  const {
    data: playerCount,
    isError: playerCountError,
    isLoading: isPlayerCountLoading,
  } = useContractRead({
    address: moduleAddress,
    abi: abi,
    functionName: "getPlayerCount",
    args: [gameAddress],
    // enabled: enabled != undefined ? enabled : true,
  });

  const [players, setPlayers] = useState<string>("0");

  useEffect(() => {
    console.log("PC request to: ", moduleAddress, gameAddress)
    console.log("playerCount", playerCount, playerCountError, isPlayerCountLoading)
    if (playerCount) {
      setPlayers(BigInt(playerCount as string).toString());
    }
  }, [playerCount, playerCountError, isPlayerCountLoading]);

  return { players, playerCountError };
};

export default usePlayerCount;
