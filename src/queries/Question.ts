import {
  deleteQuestion,
  getQuestionDetail,
  getQuestionHashtag,
  getQuestionList,
  getStackQuestionList,
  Question,
  QuestionDetailResponse,
} from "api/Question";
import { AxiosResponse } from "axios";
import queryKeys from "constant/queryKeys";
import { useCallback } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const useQuestionList = (size: number) =>
  useInfiniteQuery(
    [queryKeys.question],
    async ({ pageParam = 1 }) => {
      const response = await getQuestionList(pageParam, size);

      return { page: pageParam, data: response.data.data };
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );

const useStackQuestionList = (id: number[]) => {
  return useQuery(
    [queryKeys.stackQuestion, id],
    () => getStackQuestionList(id)
  );
}

const useQuestionDetail = (videoId: number) => {
  return useQuery(
    [queryKeys.question, queryKeys.questionId(videoId)],
    () => getQuestionDetail(videoId),
    {
      enabled: false,
    }
  );
};

const useQuestionHashtag = (videoId: number) =>
  useQuery(
    [
      queryKeys.question,
      queryKeys.questionId(videoId),
      queryKeys.questionHashtag,
    ],
    () => getQuestionHashtag(videoId)
  );

const useQuestionMutation = () => {
  const remove = useMutation((videoId: number) => deleteQuestion(videoId));

  return { remove };
};

export {
  useQuestionList,
  useStackQuestionList,
  useQuestionMutation,
  useQuestionDetail,
  useQuestionHashtag,
};
