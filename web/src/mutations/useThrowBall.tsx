

import { useEffect, useState } from "react";
import { Address, WriteContractErrorType } from "viem";
import { BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

// import type { Abi } from 'viem'

const abi = [
  {
    "type": "function",
    "name": "createInteraction",
    "inputs": [
        {
            "name": "game",
            "type": "address",
            "internalType": "contract IGame"
        },
        {
            "name": "giver",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "distance",
            "type": "uint256",
            "internalType": "uint256"
        }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
},
]



const useThrowBall = ({
  moduleAddress,
  player,
}: {
  moduleAddress: Address;
  player: Address;
}) => {

  const [throwHash, setThrowHash] = useState<`0x${string}` | undefined>();
  const [throwError, setThrowError] = useState<Error>();
  const [throwPending, setThrowPending] = useState<boolean>();

  const { data, error: err, isPending: pending, writeContract } = useWriteContract()


  useEffect(() => {
    if (data) {
      setThrowHash(data);
    }
    if (err) {
      setThrowError(err);
    }
    if (pending) {
      setThrowPending(pending);
    }
  }, [data, err, pending]);


  const writeThrow = async () => {

    writeContract({
      abi: abi,
      address: contractAddress,
      functionName: "createInteraction",
      args: [player],
    })
  };

  return { throwHash, throwError, throwPending, writeThrow };

};

export default useThrowBall;