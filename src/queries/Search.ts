import { getSearchTitle } from "api/Search";
import { useMutation } from "react-query";

const useSearchMutation = () => useMutation(async (q:string) => {
  return await getSearchTitle(q);
})

export {useSearchMutation};