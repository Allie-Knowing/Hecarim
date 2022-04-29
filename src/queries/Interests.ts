import { getInterests } from "api/Interests";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useGetInterests = () => {
  const useGetInterests = useQuery(
    [queryKeys.interests],
    async () => await getInterests(),
    { refetchOnWindowFocus: false, enabled: true, retry: false, cacheTime: 0 }
  );

  return useGetInterests;
};
