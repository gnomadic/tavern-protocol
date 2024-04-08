
"use client"
import { pretty } from "@/domain/utils";
import useGameSummary from "@/hooks/useGameSummary";
import useArbitraryFunction from "@/mutations/useArbitraryFunction";
import { Abi, Address } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";


type ActionProps = {
  contractAddress: Address
  abi: Abi;
  functionName: string;
  args: any[]
}

export default function ArbitraryActionButton(props: ActionProps) {

  const { arbitraryHash, arbitraryHashError, arbitraryHashPending, writeArbitraryFunction }
    = useArbitraryFunction({
      contractAddress: props.contractAddress,
      abi: props.abi,
      functionName: props.functionName,
      args: props.args,
    })
  const { isLoading: registerModuleIsConfirming, isSuccess: registerModuleIsConfirmed } = useWaitForTransactionReceipt({ hash: arbitraryHash });


  return (

    <div className="pt-4">

      <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
        disabled={arbitraryHashPending}
        onClick={() => {
          writeArbitraryFunction()

        }}
      >
        {arbitraryHashPending ? 'Confirming...' : `${props.functionName}`}



      </button>
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
