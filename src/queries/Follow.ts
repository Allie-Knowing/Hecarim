import { getFollowers, getFollowings } from "api/Follow";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useFollowers = (userId: number) => useQuery(
    [queryKeys.follower, userId],
    async () => await getFollowers(userId),
    { refetchOnWindowFocus: false, enabled: true, retry: false, cacheTime: 0 }
);

export const useFollowings = (userId: number) => useQuery(
    [queryKeys.following, userId],
    async () => await getFollowings(userId),
    { refetchOnWindowFocus: false, enabled: true, retry: false, cacheTime: 0 }
);
