import {
  getProfileAnswerListApi,
  getProfileApi,
  getProfilQuestionListApi,
} from "api/Profile";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

export const useProfile = (userId: number) =>
  useQuery([queryKeys.profile, userId], () => getProfileApi({ id: userId }), {
    enabled: true,
    refetchOnMount: "always",
  });

export const useProfileQuestionList = (userId: number) =>
  useQuery(
    [queryKeys.profileQuestionList, userId],
    () => getProfilQuestionListApi({ id: userId }),
    {
      enabled: true,
      refetchOnMount: "always",
    }
  );

export const useProfileAnswerList = (userId: number) =>
  useQuery(
    [queryKeys.profileQuestionList, userId],
    () => getProfileAnswerListApi(userId),
    {
      enabled: true,
      refetchOnMount: "always",
    }
  );
