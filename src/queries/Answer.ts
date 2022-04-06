import {
  adoptionVideoAnswer,
  deleteVideoAnswer,
  getVideoAnswerList,
} from "api/Answer";
import queryKeys from "constant/queryKeys";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

const useVideoAnswerList = (questionId: number, size: number) => {
  return useInfiniteQuery(
    [queryKeys.answer, queryKeys.questionId(questionId)],
    async ({ pageParam = 1 }) => {
      const response = await getVideoAnswerList(questionId, pageParam, size);

      return { page: pageParam, data: response.data.data };
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );
};

const useVideoAnswerMutation = () => {
  const adoption = useMutation((videoId: number) =>
    adoptionVideoAnswer(videoId)
  );

  const remove = useMutation((videoId: number) => deleteVideoAnswer(videoId));

  return { adoption, remove };
};

export { useVideoAnswerList, useVideoAnswerMutation };
