

import { useEffect, useState } from "react";
import { Address, WriteContractErrorType } from "viem";
import { BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'


const abi = [
  {
    "type": "function",
    "name": "catchBall",
    "inputs": [
      {
        "name": "game",
        "type": "address",
        "internalType": "contract IGame"
      },
      {
        "name": "player",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
]

const useCatchBall = ({
  moduleAddress,
  game,
  player,
}: {
  moduleAddress: Address;
  game: Address;
  player: Address;
}) => {

  const [catchHash, setCatchHash] = useState<`0x${string}` | undefined>();
  const [catchError, setCatchError] = useState<Error>();
  const [catchPending, setCatchPending] = useState<boolean>();

  const { data, error: err, isPending: pending, writeContract } = useWriteContract()


  useEffect(() => {
    if (data) {
      setCatchHash(data);
    }
    if (err) {
      setCatchError(err);
    }
    if (pending) {
      setCatchPending(pending);
    }
  }, [data, err, pending]);


  const writeCatch = async () => {

    writeContract({
      abi: abi,
      address: moduleAddress,
      functionName: "catchBall",
      args: [game, player],
    })
  };

  return { catchHash, catchError, catchPending, writeCatch };

};

export default useCatchBall;