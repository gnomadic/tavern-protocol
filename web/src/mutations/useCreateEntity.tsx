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
import { EntityFactoryABI } from "@/domain/abi/EntityFactory";



const useCreateEntity = ({
  contractAddress,

  // enabled,
}: {
  contractAddress: Address;

  // enabled?: boolean | undefined;
}) => {

  const [createEntityHash, setCreateEntityHash] = useState<`0x${string}` | undefined>();
  const [createEntityError, setCreateEntityError] = useState<Error>();
  const [createEntityisPending, setCreateEntityisPending] = useState<boolean>();

  const { data, error: err, isPending: pending, writeContract } = useWriteContract()


  useEffect(() => {
    if (data) {
      setCreateEntityHash(data);
    }
    if (err) {
      setCreateEntityError(err);
    }
    if (pending) {
      setCreateEntityisPending(pending);
    }
  }, [data, err, pending]);


  // const { writeContract } = useWriteContract()

  const writeCreateEntityToChain = async (game: Address, displayName: string, nft: Address) => {
    // function createEntity(address _game, string calldata _displayName, address _nft) public {
    writeContract({
      abi: EntityFactoryABI,
      address: contractAddress,
      functionName: 'createEntity',
      args: [
        game,
        displayName,
        nft,
        [],
        ["dailyActions", "lastActionAt"]
      ],
    })
  };

  return { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain };



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

export default useCreateEntity;