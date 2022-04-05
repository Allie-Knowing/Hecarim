import { getMyIdApi } from "api/MyId";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useMyId = () =>
  useQuery([queryKeys.myId], () => getMyIdApi(), { enabled: true });
