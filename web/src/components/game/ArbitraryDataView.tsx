
"use client"
import { AddressKey } from "@/domain/Domain";
import { pretty } from "@/domain/utils";
import useArbitraryData from "@/hooks/useArbitraryData";
import useGameSummary from "@/hooks/useGameSummary";
import useArbitraryFunction from "@/mutations/useArbitraryFunction";
import { Abi, Address } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";


type ActionProps = {
  addresskey: AddressKey
}

export default function ArbitraryDataView(props: ActionProps) {

  // const { arbitraryHash, arbitraryHashError, arbitraryHashPending, writeArbitraryFunction }
  //   = useArbitraryFunction({
  //     contractAddress: props.contractAddress,
  //     abi: props.abi,
  //     functionName: props.functionName,
  //     args: props.args,
  //   })
  // const { isLoading: registerModuleIsConfirming, isSuccess: registerModuleIsConfirmed } = useWaitForTransactionReceipt({ hash: arbitraryHash });


  //todo don't hardcode token id here
  const { data, isDataError } = useArbitraryData({ contractAddress: props.addresskey.Address, tokenid: 0, key: props.addresskey.Key })

  return (

    <div className="pt-4 flex">
      <div className="mx-auto">{props.addresskey.Key}</div>
      <div className="mx-auto">{data ? data.toString() : "loading..."}</div>



      {/* {props.contractAddress}
            <br/>
            {JSON.stringify(props.abi)}
            <br/>
            {props.functionName}
            <br/>
            {JSON.stringify(props.args)} */}

      {/* <div>{JSON.stringify(currentGames[i])}</div> */}
      {/* <Divider /> */}

    </div>

  );
}
