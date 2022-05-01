import { putNickname } from "api/NicknameEdit";
import { putProfile } from "api/ProfileEdit";
import { useMutation } from "react-query";

export const useNicknameEdit = () => {
  return useMutation(async (nickname: string) => await putNickname(nickname));
};

export const useProfileEdit = () => {
  return useMutation(async (profile: any) => await putProfile(profile));
};
