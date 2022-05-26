import uri from "constance/uri";
import { instance } from "utils/axios";

export interface FollowItem {
    id: number;
    profile: string | null;
    name: string;
}

export const getFollowers = async (userId: number) => {
  return await instance.get<FollowItem[]>(`${uri.getFollower}?userId=${userId}`);
};

export const getFollowings = async (userId: number) => {
  return await instance.get<FollowItem[]>(`${uri.getFollowing}?userId=${userId}`);
};
