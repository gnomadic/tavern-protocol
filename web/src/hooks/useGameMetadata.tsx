import { GameMetadata, GameSummary } from '@/domain/Domain'
import useSWR, { SWRResponse, Fetcher } from 'swr';

export function useGameMetadata (url: string | undefined) {

    const fetcher: Fetcher<GameSummary> = async () => {

        const target = `/api/?ipfsURL=${url}`
        console.log(target)
        const res = await fetch(target , {
          method: 'GET',
          headers: { 'Content-type': 'application/json' },
        });
        if (!res.ok) throw new Error('An error occurred while fetching the data.');
    
        const json = (await res.json()) ;
        console.log(json)
        return json;
      };
    
      return useSWR(url, fetcher);
  }