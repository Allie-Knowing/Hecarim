import {
  adoptionVideoAnswer,
  deleteVideoAnswer,
  getVideoAnswerCount,
  getVideoAnswerDetail,
  getVideoAnswerList,
} from "api/Answer";
import queryKeys from "constant/queryKeys";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

const useVideoAnswerList = (questionId: number, size: number) => {
  return useInfiniteQuery(
    [queryKeys.answer, queryKeys.questionId(questionId)],
    async ({ pageParam = 1 }) => {
      const page = Number(pageParam);
      const response = await getVideoAnswerList(questionId, page, size);

      return { page, data: response.data.data };
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );
};

const useVideoAnswerMutation = () => {
  const adoption = useMutation((videoId: number) => adoptionVideoAnswer(videoId));

  const remove = useMutation((videoId: number) => deleteVideoAnswer(videoId));

  return { adoption, remove };
};

const useVideoAnswerDetail = (videoId: number) => {
  return useQuery(
    [queryKeys.answer, queryKeys.videoAnswerId(videoId)],
    () => getVideoAnswerDetail(videoId),
    { enabled: false }
  );
};

const useVideoAnswerCount = (videoId: number) => {
  return useQuery([queryKeys.answer, queryKeys.questionId(videoId), queryKeys.count], () =>
    getVideoAnswerCount(videoId)
  );
};

export { useVideoAnswerList, useVideoAnswerMutation, useVideoAnswerDetail, useVideoAnswerCount };
