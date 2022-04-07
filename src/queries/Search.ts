import { getSearchTitle } from "api/Search";
import queryKeys from "constant/queryKeys";
import { useMutation, useQuery } from "react-query";

export const useSearchResults = (q: string) => {
  return useQuery([queryKeys.search, q], () => getSearchTitle(q));
}

const useSearchMutation = () => useMutation(async (q:string) => {
  return await getSearchTitle(q);
})

export {useSearchMutation};