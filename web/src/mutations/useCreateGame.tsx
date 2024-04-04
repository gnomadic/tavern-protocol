// {
//     "type": "function",
//     "name": "createGame",
//     "inputs": [],
//     "outputs": [],
//     "stateMutability": "nonpayable"
// },

import { useEffect, useState } from "react";
import { Address, WriteContractErrorType } from "viem";
import { BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

const abi = [
  {
    "type": "function",
    "name": "createGame",
    "inputs": [
      {
        "name": "_gm",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "displayName",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
];


const useCreateGame = ({
  contractAddress,

  // enabled,
}: {
  contractAddress: Address;

  // enabled?: boolean | undefined;
}) => {

  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState<boolean>();

  const { data, error: err, isPending: pending, writeContract } = useWriteContract()


  useEffect(() => {
    if (data) {
      setHash(data);
    }
    if (err) {
      setError(err);
    }
    if (pending) {
      setIsPending(pending);
    }
  }, [data, err, pending]);

  // const { writeContract } = useWriteContract()

  const writeToChain = async (gm: Address, displayName: string) => {

    writeContract({
      abi,
      address: contractAddress,
      functionName: 'createGame',
      args: [
        gm,
        displayName,
      ],
    })
  };

  return { hash, error, isPending, writeToChain };



  // const result = useReadContract({
  //     abi,
  //     address: contractAddress,
  //     functionName: 'createGame',
  //   }) 
  // const {
  //   data: supply,
  //   isError: isCurSupplyError,
  //   isLoading: isCurSupplyLoading,
  // } = useContractRead({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "currentSupply",
  //   // enabled: enabled != undefined ? enabled : true,
  // });

  // const [curSupply, setCurSupply] = useState(BigInt(0));

  // useEffect(() => {
  //   if (supply) {
  //     setCurSupply(BigInt(supply as number));
  //   }
  // }, [supply]);

  // return { curSupply, isCurSupplyError };
};

export default useCreateGame;