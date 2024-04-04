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
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
];





const useCreateGame =  ({
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

  const writeToChain = async () => {

    writeContract({
      abi,
      address: contractAddress,
      functionName: 'createGame',
      // args: [
      //   '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      //   '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      //   123n,
      // ],
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