import { getIQHistory } from "api/IQHistory";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useIQHistory = (page: number) =>
  useQuery([queryKeys.IQHistory, page], () => getIQHistory(page), {
    enabled: true,
    retry: false,
  });
