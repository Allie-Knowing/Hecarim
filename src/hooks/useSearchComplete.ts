import { useCallback } from "react";
import { useSearch } from "../utils/hooks/search";
import { searchPayload } from "constance/search";

const useSearchComplete = (payload: searchPayload) => {
  const { setState } = useSearch();

  

  return {  };
};

export default useSearchComplete;
