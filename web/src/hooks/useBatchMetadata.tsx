import { readIComponentGetSummary } from '@/generated';
import useSWR from 'swr';
import { Address } from 'viem';



export function useBatchMetadata<T>(ipfs: string | undefined) {
  const fetcher = (url: string) => fetch(url).then(r => r.json())


  // promiseHooks.al



// readIComponentGetSummary({});
  


  let url = `/api/?ipfsURL=${ipfs}`
  // return useSWR<T>(url, fetcher);

  const { data : raw, error } = useSWR<T>(url, fetcher);
  let data = raw as T;
  return {
    data,
    error
  };
}