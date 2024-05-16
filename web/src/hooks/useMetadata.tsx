import useSWR from 'swr';

export function useMetadata<T>(ipfs: string | undefined) {
  const fetcher = (url: string) => fetch(url).then(r => r.json())

  let url = `/api/?ipfsURL=${ipfs}`
  // return useSWR<T>(url, fetcher);

  const { data : raw, error } = useSWR<T>(url, fetcher);
  let data = raw as T;
  return {
    data,
    error
  };
}