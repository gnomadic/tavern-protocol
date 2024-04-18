import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment, Position } from "@/domain/Domain";

const abi = [
  {
    "type": "function",
    "name": "getBallHolderIndexes",
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
            "type": "tuple[]",
            "internalType": "struct CatchEntity.Position[]",
            "components": [
                {
                    "name": "x",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "player",
                    "type": "address",
                    "internalType": "address"
                }
            ]
        }
    ],
    "stateMutability": "view"
},
];

const useBallHolderIndexes = ({
  moduleAddress,
  gameAddress

  // enabled,
}: {
  moduleAddress: Address;
  gameAddress: Address;

  // enabled?: boolean | undefined;
}) => {
  const {
    data: ballHolders,
    isError: ballHoldersError,
    isLoading: ballHoldersLoading,
  } = useContractRead({
    address: moduleAddress,
    abi: abi,
    functionName: "getBallHolderIndexes",
    args: [gameAddress],
    // enabled: enabled != undefined ? enabled : true,
  });

  const [holders, setHolders] = useState<BigInt[]>([]);

  useEffect(() => {
    console.log("BH request to: ", moduleAddress, gameAddress)
    console.log("Ball holders: ", ballHolders, ballHoldersError, ballHoldersLoading)
    if (ballHolders) {

      let found: BigInt[] = [];

      (ballHolders as Position[]).map((holder: Position) => {
        found.push(BigInt(holder.x.toString()));
      });
      setHolders(found);
    }
  }, [ballHolders, ballHoldersError, ballHoldersLoading]);

  return { holders, ballHoldersError };
};

export default useBallHolderIndexes;
