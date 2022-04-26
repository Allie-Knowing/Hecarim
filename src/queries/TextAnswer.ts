import {
  adoptionTextAnswer,
  deleteTextAnswer,
  getTextAnswerList,
  postTextAnswer,
  reportTextAnswer,
} from "api/TextAnswer";
import queryKeys from "constant/queryKeys";
import { useInfiniteQuery, useMutation } from "react-query";

export const useTextAnswerList = (questionId: number, size: number, enabled: boolean) => {
  const key = [queryKeys.question, queryKeys.questionId(questionId), queryKeys.textAnswerList];

  return useInfiniteQuery(
    key,
    async ({ pageParam = 1 }) => {
      const response = await getTextAnswerList(questionId, pageParam, size);

      return { page: pageParam, data: response.data.data };
    },
    {
      enabled: enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );
};

export const useTextAnswerMutation = () => {
  const post = useMutation(({ questionId, content }: { questionId: number; content: string }) =>
    postTextAnswer(questionId, content)
  );

  const remove = useMutation(({ commentId }: { commentId: number }) => deleteTextAnswer(commentId));

  const adoption = useMutation((commentId: number) => adoptionTextAnswer(commentId));

  const report = useMutation(
    ({
      videoId,
      commentId,
      description,
    }: {
      videoId: number;
      commentId: number;
      description: string;
    }) => reportTextAnswer(videoId, commentId, description)
  );

  return { post, remove, adoption, report };
};
