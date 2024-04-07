import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { Address } from "viem";
import { Deployment } from "@/domain/Domain";
import { GameABI } from "@/domain/abi/Game";


const useGameSummary = ({
  address,
  // pageStart,
  // enabled,
}: {
  address: Address;
  // pageStart: number;
  // enabled?: boolean | undefined;
}) => {
  const {
    data,
    isError: gameSummaryError,
    isLoading: isCurSupplyLoading,
  } = useContractRead({
    address: address,
    abi: GameABI,
    functionName: "getSummary",
    // enabled: enabled != undefined ? enabled : true,
  });

  const [gameSummary, setGameSummary] = useState<any>();

  useEffect(() => {
    if (data) {
      setGameSummary(data);
    }
  }, [data]);

  return { gameSummary, gameSummaryError };
};

export default useGameSummary;
