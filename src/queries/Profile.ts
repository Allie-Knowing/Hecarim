import { getProfileApi, getProfilQuestionListApi } from "api/Profile";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useProfile = (userId: number) =>
  useQuery([queryKeys.profile, userId], () => getProfileApi({ id: userId }), {
    enabled: true,
  });

export const useProfileQuestionList = (userId: number) =>
  useQuery(
    [queryKeys.profileQuestionList, userId],
    () => getProfilQuestionListApi({ id: userId }),
    {
      enabled: true,
    }
  );
