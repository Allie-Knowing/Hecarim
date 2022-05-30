import uri from "constance/uri";
import { instance } from "utils/axios";

export interface FollowItem {
  id: number;
  profile: string | null;
  name: string;
}

export interface IsFollow {
  is_follow: boolean;
}

export const getFollowers = async (userId: number) => {
  return await instance.get<FollowItem[]>(`${uri.getFollower}?userId=${userId}`);
};

export const getFollowings = async (userId: number) => {
  return await instance.get<FollowItem[]>(`${uri.getFollowing}?userId=${userId}`);
};

export const getIsFollow = async (userId: number) => {
  return await instance.get<IsFollow>(`${uri.getFollowing}/${userId}`);
};

export const postFollow = async (userId: number) => {
  return await instance.post(`${uri.getFollowing}`, {
    userId,
  });
};

export const cancelFollow = async (userId: number) => {
  return await instance.delete(`${uri.getFollowing}`, {
    data: {
      userId,
    },
  });
};
