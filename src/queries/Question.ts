import {
  deleteQuestion,
  getQuestionDetail,
  getQuestionHashtag,
  getQuestionList,
} from "api/Question";
import queryKeys from "constant/queryKeys";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

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

const useQuestionDetail = (videoId: number) =>
  useQuery([queryKeys.question, queryKeys.questionId(videoId)], () =>
    getQuestionDetail(videoId)
  );

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
  useQuestionMutation,
  useQuestionDetail,
  useQuestionHashtag,
};
